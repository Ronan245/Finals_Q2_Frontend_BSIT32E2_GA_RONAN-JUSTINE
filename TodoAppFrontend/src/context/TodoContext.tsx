import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<boolean>;
  deleteTodo: (id: string) => Promise<boolean>;
  toggleTodo: (todo: Todo) => Promise<boolean>;
  updateTodo: (id: string, title: string) => Promise<boolean>;
};

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const API_BASE = "http://localhost:5154/api/todos";

  const fetchTodos = async () => {
    const res = await fetch(API_BASE);
    if (res.ok) {
      const data: Todo[] = await res.json();
      setTodos(data);
    }
  };

  const addTodo = async (title: string) => {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    });

    if (!res.ok) return false;

    const newTodo: Todo = await res.json();
    setTodos((prev) => [...prev, newTodo]);
    return true;
  };

  const deleteTodo = async (id: string) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) return false;

    setTodos((prev) => prev.filter((t) => t.id !== id));
    return true;
  };

  const toggleTodo = async (todo: Todo) => {
    const res = await fetch(`${API_BASE}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todo.title,
        completed: !todo.completed,
      }),
    });

    if (!res.ok) return false;

    const updated: Todo = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    return true;
  };

  const updateTodo = async (id: string, title: string) => {
    const existing = todos.find((t) => t.id === id);
    if (!existing) return false;

    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        completed: existing.completed,
      }),
    });

    if (!res.ok) return false;

    const updated: Todo = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    return true;
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{ todos, fetchTodos, addTodo, deleteTodo, toggleTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
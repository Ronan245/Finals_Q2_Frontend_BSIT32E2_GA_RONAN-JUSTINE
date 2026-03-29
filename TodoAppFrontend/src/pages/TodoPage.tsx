import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import { useTheme } from "../context/ThemeContext";

export default function TodoPage() {
  const { theme } = useTheme();
  const textColor =
    theme === "dark" || theme === "ocean" ? "#f8fafc" : "#0f172a";
  const subTextColor =
    theme === "dark" || theme === "ocean" ? "#cbd5e1" : "#475569";

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px" }}>
      <h1 style={{ color: textColor }}>Todo App</h1>
      <p style={{ color: subTextColor }}>
        Manage your tasks using the Todo API backend.
      </p>

      <AddTodoForm />
      <TodoList />
    </main>
  );
}
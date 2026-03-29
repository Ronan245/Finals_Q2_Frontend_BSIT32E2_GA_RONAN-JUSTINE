import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { useTheme } from "../context/ThemeContext";
import EditTodoModal from "./EditTodoModal";
import type { Todo } from "../context/TodoContext";

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const { deleteTodo, toggleTodo } = useTodos();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  const isDark = theme === "dark";
  const isOcean = theme === "ocean";

  const cardBg = isDark
    ? "#1e293b"
    : isOcean
    ? "rgba(255,255,255,0.12)"
    : "#ffffff";

  const borderColor = isDark ? "#334155" : isOcean ? "#7dd3fc" : "#e5e7eb";
  const headingColor = isDark || isOcean ? "#f8fafc" : "#0f172a";
  const textColor = isDark || isOcean ? "#cbd5e1" : "#475569";

  return (
    <>
      <li
        style={{
          listStyle: "none",
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: "18px",
          padding: "18px",
          marginBottom: "14px",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "8px",
            color: headingColor,
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.title}
        </h3>

        <p style={{ color: textColor, marginTop: 0 }}>
          Status: {todo.completed ? "Completed" : "Pending"}
        </p>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => toggleTodo(todo)}
            style={{
              backgroundColor: "#22c55e",
              color: "#ffffff",
              border: "none",
              padding: "10px 14px",
              borderRadius: "10px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Toggle
          </button>

          <button
            onClick={() => setIsEditing(true)}
            style={{
              backgroundColor: "#f59e0b",
              color: "#ffffff",
              border: "none",
              padding: "10px 14px",
              borderRadius: "10px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteTodo(todo.id)}
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              border: "none",
              padding: "10px 14px",
              borderRadius: "10px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </li>

      {isEditing && (
        <EditTodoModal todo={todo} onClose={() => setIsEditing(false)} />
      )}
    </>
  );
}
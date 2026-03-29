import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import { useTheme } from "../context/ThemeContext";
import { useTodos } from "../hooks/useTodos";

export default function TodoPage() {
  const { theme } = useTheme();
  const { todos } = useTodos();

  const isDark = theme === "dark";
  const isOcean = theme === "ocean";

  const textColor = isDark || isOcean ? "#f8fafc" : "#0f172a";
  const subTextColor = isDark || isOcean ? "#cbd5e1" : "#475569";
  const cardBg = isDark
    ? "#1e293b"
    : isOcean
    ? "rgba(255,255,255,0.12)"
    : "#ffffff";
  const borderColor = isDark ? "#334155" : isOcean ? "#7dd3fc" : "#e5e7eb";

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);
  const maxReached = activeTodos.length >= 5;

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px" }}>
      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ color: textColor, marginBottom: "8px" }}>Todo App</h1>
        <p style={{ color: subTextColor, margin: 0 }}>
          Manage your tasks using the Todo API backend.
        </p>
      </header>

      <section
        style={{
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: "18px",
          padding: "18px",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            color: textColor,
            marginTop: 0,
            marginBottom: "10px",
            fontSize: "1.1rem",
          }}
        >
          Focus-Flow Status
        </h2>

        <p style={{ color: subTextColor, margin: "0 0 8px" }}>
          Active Tasks: <strong style={{ color: textColor }}>{activeTodos.length}</strong> / 5
        </p>

        <p style={{ color: subTextColor, margin: "0 0 8px" }}>
          Completed Tasks: <strong style={{ color: textColor }}>{completedTodos.length}</strong>
        </p>

        <p style={{ color: subTextColor, margin: 0 }}>
          Tasks must be completed in creation order, and completed tasks will
          disappear after 15 seconds.
        </p>
      </section>

      {maxReached && (
        <div
          style={{
            backgroundColor: "#7f1d1d",
            color: "#ffffff",
            fontWeight: 700,
            padding: "14px 16px",
            borderRadius: "14px",
            marginBottom: "18px",
          }}
        >
          Maximum of 5 active tasks reached. Complete a task first before adding
          another.
        </div>
      )}

      <AddTodoForm maxReached={maxReached} />
      <TodoList />
    </main>
  );
}
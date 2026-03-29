import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";
import { useTheme } from "../context/ThemeContext";

type FormValues = {
  title: string;
};

export default function AddTodoForm() {
  const { addTodo } = useTodos();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const isDark = theme === "dark";
  const isOcean = theme === "ocean";

  const inputBg = isDark
    ? "#0f172a"
    : isOcean
    ? "rgba(255,255,255,0.9)"
    : "#ffffff";

  const textColor = isDark || isOcean ? "#f8fafc" : "#0f172a";
  const borderColor = isDark ? "#334155" : isOcean ? "#7dd3fc" : "#e5e7eb";

  const onSubmit = async (data: FormValues) => {
    const success = await addTodo(data.title.trim());

    if (success) {
      reset();
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "24px" }}>
      <div style={{ marginBottom: "12px" }}>
        <input
          type="text"
          placeholder="Enter todo title"
          {...register("title", { required: "Title is required" })}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: "12px",
            border: `1px solid ${borderColor}`,
            backgroundColor: inputBg,
            color: textColor,
          }}
        />
        {errors.title && (
          <p style={{ color: "#ef4444", marginTop: "8px" }}>
            {errors.title.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: "#3b82f6",
          color: "#ffffff",
          border: "none",
          padding: "12px 18px",
          borderRadius: "12px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Add Todo
      </button>
    </form>
  );
}
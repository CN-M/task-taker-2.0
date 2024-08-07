import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../lib/authStore";
import { rootURL } from "../lib/utils";
import { taskSchema } from "../lib/validations";
import { Todo } from "../types";

export const AddTask = ({
  task,
  setTask,
  todos,
  setTodos,
}: {
  task: string;
  setTask: Dispatch<SetStateAction<string>>;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}) => {
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const originalTodos = [...todos];

  const addTask = async () => {
    try {
      if (!user || !user.accessToken) {
        throw new Error("User not authenticated or token not available.");
      }

      const parsedData = taskSchema.safeParse({ task });
      if (!parsedData.success) {
        const errorMessages = parsedData.error.errors.map(
          (error) => error.message
        );
        throw new Error(errorMessages.join(", "));
      }

      const tempId = Math.floor(Math.random() * 100_000);

      const newTodo: Todo = {
        id: tempId,
        task: parsedData.data.task,
      };

      setTodos([...originalTodos, newTodo]);
      setTask("");

      const res = await fetch(`${rootURL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ task: parsedData.data.task }),
        credentials: "include",
      });

      const data = await res.json();

      const actualId = data.id;

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === tempId ? { ...todo, id: actualId } : todo
        )
      );

      return data;
    } catch (err) {
      console.error("Error:", err);
      toast.error((err as Error).message || "Error adding task");
      setTodos(originalTodos);
    } finally {
      setIsLoading(false);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setTask(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTask = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    await addTask();
  };

  return (
    <div className="flex flex-col p-10 space-y-5">
      <form onSubmit={handleTask} className="flex flex-col space-y-3">
        <input
          className="border p-2 border-emerald-500 rounded-md focus:border-blue-500"
          type="text"
          placeholder="Take out the trash"
          value={task}
          onChange={handleChange}
          required
          min={1}
        />
        <button
          className="p-3 rounded-md bg-emerald-600 text-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Adding Task..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

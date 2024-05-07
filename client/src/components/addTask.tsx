import { Dispatch, SetStateAction } from "react";
import { useAuthStore } from "../lib/authStore";
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

  const addTask = async () => {
    try {
      const res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ task, email: "cn@gmail.com" }),
      });

      if (!res.ok) {
        throw new Error("Failed to add task!");
      }

      const data = await res.json();

      // const newTodo: Todo = {
      const newTodo: Todo = {
        id: data.id,
        task: task,
      };

      setTodos([...todos, newTodo]);

      return data;
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setTask(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTask = (e: any) => {
    e.preventDefault();

    addTask();
    setTask("");
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
        />
        <button
          className="p-3 rounded-md bg-emerald-600 text-white"
          type="submit"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

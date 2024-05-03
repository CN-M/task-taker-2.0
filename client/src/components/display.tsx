import { Dispatch, SetStateAction, useEffect } from "react";
import { useAuthStore } from "../lib/authStore";
import { cn } from "../lib/utils";
import { Todo } from "../types";

export const Display = ({
  todos,
  setTodos,
  isLoading,
  setIsLoading,
}: {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const user = useAuthStore((state) => state.user);

  console.log(user);

  const deleteTask = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        const result = todos.filter((todo) => todo.id !== id);
        setTodos(result);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const updateTask = async (id: number) => {
    try {
      const res = await fetch("http://localhost:3000/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        const result = todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );

        setTodos(result);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:3000/");
        const data = await res.json();

        setTodos(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error", err);
        setIsLoading(false);
      }
    };

    getData();
  }, [setIsLoading, setTodos, user]);

  return (
    <div className=" ">
      <div className="space-y-3">
        {isLoading ? (
          <p>Loading tasks...</p>
        ) : (
          <>
            {todos.length < 1 ? (
              <h3>You have no tasks to display</h3>
            ) : (
              todos?.map(({ task, id, completed }) => (
                <div
                  key={id}
                  onDoubleClick={() => updateTask(id)}
                  className="border rounded-md p-3 border-emerald-300"
                >
                  <div className="flex justify-around py-2 px-10 gap-3 hover:cursor-pointer">
                    <p
                      className={cn(
                        "text-2xl",
                        completed ? "line-through" : ""
                      )}
                    >
                      {task}
                    </p>
                    <button
                      onClick={() => deleteTask(id)}
                      className="bg-red-500 text-sm text-white tracking-widest border-none hover:bg-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

import { Dispatch, SetStateAction, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/authStore";
import { checkAndDeleteExpiredItem, cn, rootURL } from "../lib/utils";
import { Todo } from "../types";
const { VITE_ENV, VITE_BACKEND_URL } = import.meta.env;

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
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isError = useAuthStore((state) => state.isError);
  const errorMessage = useAuthStore((state) => state.errorMessage);

  const deleteTask = async (id: number) => {
    try {
      const res = await fetch(`${rootURL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        credentials: "include",
      });

      if (res.ok) {
        const result = todos.filter((todo) => todo.id !== id);
        setTodos(result);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error:", err);
      toast.error("Error deleting task");
    }
  };

  const updateTask = async (id: number) => {
    try {
      const res = await fetch(`${rootURL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        credentials: "include",
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
      toast.error("Error updating task");
    }
  };

  useEffect(() => {
    console.log(VITE_ENV);
  console.log(VITE_BACKEND_URL);

    if (isError) {
      toast.error(errorMessage);
    }

    const MAX_AGE = 14 * 24 * 60 * 60 * 1000; // 14 days

    checkAndDeleteExpiredItem("user", MAX_AGE);

    const getData = async () => {
      try {
        const res = await fetch(`${rootURL}/tasks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          credentials: "include",
        });
        const data = await res.json();

        setTodos(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error", err);
        setIsLoading(false);
      }
    };

    if (!user && isAuthenticated == false) {
      navigate("/login");
    } else {
      getData();
    }
  }, [
    user,
    isAuthenticated,
    navigate,
    setIsLoading,
    setTodos,
    isError,
    errorMessage,
  ]);

  return (
    <div className="flex flex-col items-center">
      {user && isAuthenticated ? (
        <>
        <h2 className="text-xl p-5 font-semibold">
          Hey, {user.firstName}! Here are your tasks:
        </h2>
        <p className="pb-5" >Hint: Double click on a task to mark it complete.</p>
        </>
      ) : (
        <></>
      )}
      <div className="flex flex-col justify-center items-center space-y-3">
        {isLoading ? (
          <p>Loading tasks...</p>
        ) : (
          <>
            {todos?.length < 1 ? (
              <h3>You have no tasks to display</h3>
            ) : (
              todos?.map(({ task, id, completed }) => (
                <div
                  key={id}
                  onDoubleClick={() => updateTask(id)}
                  className="w-full border rounded-md p-3 border-emerald-300"
                >
                  <div className="flex justify-around items-center py-2 px-10 gap-3 hover:cursor-pointer">
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
                      className="rounded-md px-4 py-3 bg-red-500 text-sm text-white tracking-widest border-none hover:bg-red-400"
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

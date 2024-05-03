import "./App.css";

import { useEffect, useState } from "react";
import { AddTask } from "./components/addTask";
import { BearDisplay } from "./components/bearDisplay";
import { Display } from "./components/display";
import { LoginForm } from "./components/loginForm";
import { SignUpForm } from "./components/signUpForm";

import { Todo } from "./types";

type User = {
  email?: string;
  password?: string;
};

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [user, setUser] = useState<User>({});

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/users/current");
        const data = await res.json();
        setUser(data);
        console.log(data); // Log the updated user data
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    getCurrentUser();
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-center space-y-4">
      <BearDisplay />
      <h1>Task Taker</h1>
      <p>Hint: Double click on a task to cross it out</p>
      {user ? <h1>Hello {user.email} </h1> : <h1>Please Log in</h1>}
      <Display
        todos={todos}
        setTodos={setTodos}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <AddTask
        task={task}
        setTask={setTask}
        todos={todos}
        setTodos={setTodos}
      />
      <LoginForm />
      <SignUpForm />
    </div>
  );
}

export default App;

import { useState } from "react";
import { useAuthStore } from "../lib/authStore";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginThing = useAuthStore((state) => state.login);

  const login = async () => {
    try {
      const res = await fetch("http://localhost:3000/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Failed to sign user up!");
      }

      const data = await res.json();
      console.log(data);

      const userData = { username: "example", email: "example@example.com" };
      loginThing(userData);

      return data;
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTask = (e: any) => {
    e.preventDefault();

    login();
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col p-10 space-y-5">
      <h1>Log In</h1>
      <h2 className="text-xl font-sans">
        Log in to make the best of Task Taker
      </h2>
      <div className="flex flex-col items-center">
        <form onSubmit={handleTask} className="flex flex-col space-y-3">
          <input
            className="border p-2 border-emerald-500 rounded-md focus:border-blue-500"
            type="email"
            placeholder="hulk@hogan.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2 border-emerald-500 rounded-md focus:border-blue-500"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="p-3 rounded-md bg-emerald-600 text-white"
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

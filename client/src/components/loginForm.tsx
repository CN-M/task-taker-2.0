import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/authStore";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user && isAuthenticated) {
      navigate("/");
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = (e: any) => {
    e.preventDefault();

    try {
      login({ email, password });
    } catch (err) {
      console.error("Error", err);
    }
  };

  return (
    <div className="flex flex-col p-10 space-y-5">
      <h1>Log In</h1>
      <h2 className="text-xl font-sans">
        Log in to make the best of Task Taker
      </h2>
      <div className="flex flex-col items-center">
        <form onSubmit={handleLogin} className="flex flex-col space-y-3">
          <input
            className="border p-2 border-emerald-500 rounded-md focus:border-blue-500"
            type="email"
            placeholder="hulk@hogan.com"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border p-2 border-emerald-500 rounded-md focus:border-blue-500"
            type="password"
            autoComplete="current-password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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

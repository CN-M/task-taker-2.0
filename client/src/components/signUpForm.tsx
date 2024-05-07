import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/authStore";

export const SignUpForm = () => {
  const navigate = useNavigate();

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = useAuthStore((state) => state.register);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user && isAuthenticated) {
      navigate("/");
    }
  }, [user, isAuthenticated, navigate]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      register({ email, firstName, lastName, password });
      // Successful registration will navigate the user automatically
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-10 space-y-5">
      <h1>Sign Up</h1>
      <h2 className="text-xl font-sans">
        Don't have an account? Sign up to make the best of Task Taker
      </h2>
      <div className="flex flex-col items-center">
        <form onSubmit={handleRegister} className="flex flex-col space-y-3">
          <div className="flex gap-2 justify-between">
            <input
              className="border p-2 border-emerald-500 rounded-md focus:border-blue-500"
              type="text"
              placeholder="Ntsako"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <input
              className="border p-2 border-emerald-500 rounded-md focus:border-blue-500"
              type="text"
              placeholder="Mbhalati"
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <input
            className="border p-2 border-emerald-500 rounded-md focus:border-blue-500"
            type="email"
            placeholder="hulk@hogan.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border p-2 border-emerald-500 rounded-md focus:border-blue-500"
            type="password"
            placeholder="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="p-3 rounded-md bg-emerald-600 text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {error && <p className="text-red-500 text-sm">{`Error: ${error}`}</p>}
        </form>
      </div>
    </div>
  );
};

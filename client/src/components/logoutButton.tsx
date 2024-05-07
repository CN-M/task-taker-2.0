import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/authStore";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!user && !isAuthenticated) {
      navigate("/login");
    }
  }, [user, isAuthenticated, navigate]);

  const handleLogout = async () => {
    setLoading(true);
    setError("");

    try {
      logout();
      // After successful logout, navigate the user to the login page
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An error occurred during logout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {user && isAuthenticated ? (
        <button onClick={handleLogout} disabled={loading}>
          {loading ? "Logging Out..." : "Logout"}
        </button>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

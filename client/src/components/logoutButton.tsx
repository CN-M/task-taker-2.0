import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/authStore";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className="">
      {user && isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </div>
  );
};

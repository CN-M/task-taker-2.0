import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../lib/authStore";

export const LoginAsGuestButton = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isGuest = useAuthStore((state) => state.isGuest);
  const isLoading = useAuthStore((state) => state.isLoading);
  const logout = useAuthStore((state) => state.logout);
  const isError = useAuthStore((state) => state.isError);
  const errorMessage = useAuthStore((state) => state.errorMessage);

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  return (
    <div hidden={!isGuest} className="bg-blue-500 rounded-lg px-5 py-2">
      {user && isAuthenticated ? (
        <button className="" onClick={handleLogout} disabled={isLoading}>
          {isLoading ? "Logging Out..." : "Logout"}
        </button>
      ) : (
        <button className="" onClick={() => navigate("/login")}>
          Login as Guest
        </button>
      )}
      {isError && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

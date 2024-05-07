"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutButton = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const authStore_1 = require("../lib/authStore");
const LogoutButton = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)("");
    const user = (0, authStore_1.useAuthStore)((state) => state.user);
    const isAuthenticated = (0, authStore_1.useAuthStore)((state) => state.isAuthenticated);
    const logout = (0, authStore_1.useAuthStore)((state) => state.logout);
    (0, react_1.useEffect)(() => {
        if (!user && !isAuthenticated) {
            navigate("/login");
        }
    }, [user, isAuthenticated, navigate]);
    const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        setError("");
        try {
            logout();
            // After successful logout, navigate the user to the login page
            navigate("/login");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (err) {
            setError(err.message || "An error occurred during logout.");
        }
        finally {
            setLoading(false);
        }
    });
    return (<div className="">
      {user && isAuthenticated ? (<button onClick={handleLogout} disabled={loading}>
          {loading ? "Logging Out..." : "Logout"}
        </button>) : (<button onClick={() => navigate("/login")}>Login</button>)}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>);
};
exports.LogoutButton = LogoutButton;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutButton = void 0;
const react_router_dom_1 = require("react-router-dom");
const authStore_1 = require("../lib/authStore");
const LogoutButton = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const user = (0, authStore_1.useAuthStore)((state) => state.user);
    const isAuthenticated = (0, authStore_1.useAuthStore)((state) => state.isAuthenticated);
    const logout = (0, authStore_1.useAuthStore)((state) => state.logout);
    return (<div className="">
      {user && isAuthenticated ? (<button onClick={logout}>Logout</button>) : (<button onClick={() => navigate("/login")}>Login</button>)}
    </div>);
};
exports.LogoutButton = LogoutButton;

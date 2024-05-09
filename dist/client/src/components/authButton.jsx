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
exports.AuthButton = void 0;
const react_router_dom_1 = require("react-router-dom");
const authStore_1 = require("../lib/authStore");
const AuthButton = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const user = (0, authStore_1.useAuthStore)((state) => state.user);
    const isAuthenticated = (0, authStore_1.useAuthStore)((state) => state.isAuthenticated);
    const isLoading = (0, authStore_1.useAuthStore)((state) => state.isLoading);
    const logout = (0, authStore_1.useAuthStore)((state) => state.logout);
    const isError = (0, authStore_1.useAuthStore)((state) => state.isError);
    const errorMessage = (0, authStore_1.useAuthStore)((state) => state.errorMessage);
    const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        logout();
        navigate("/login");
    });
    return (<div className="bg-emerald-500 rounded-lg px-5 py-2">
      {user && isAuthenticated ? (<button className="" onClick={handleLogout} disabled={isLoading}>
          {isLoading ? "Logging Out..." : "Logout"}
        </button>) : (<button className="" onClick={() => navigate("/login")}>
          Login
        </button>)}
      {isError && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>);
};
exports.AuthButton = AuthButton;

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
exports.LoginAsGuestButton = void 0;
const react_router_dom_1 = require("react-router-dom");
const authStore_1 = require("../lib/authStore");
const LoginAsGuestButton = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const user = (0, authStore_1.useAuthStore)((state) => state.user);
    const isAuthenticated = (0, authStore_1.useAuthStore)((state) => state.isAuthenticated);
    const isGuest = (0, authStore_1.useAuthStore)((state) => state.isGuest);
    const isLoading = (0, authStore_1.useAuthStore)((state) => state.isLoading);
    const logoutGuest = (0, authStore_1.useAuthStore)((state) => state.logoutGuest);
    const loginAsGuest = (0, authStore_1.useAuthStore)((state) => state.loginAsGuest);
    const isError = (0, authStore_1.useAuthStore)((state) => state.isError);
    const errorMessage = (0, authStore_1.useAuthStore)((state) => state.errorMessage);
    const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        logoutGuest();
        navigate("/login");
    });
    return (<div hidden={isAuthenticated && !isGuest} className="bg-blue-500 rounded-lg px-5 py-2">
      {user && isAuthenticated ? (<button className="" onClick={handleLogout} disabled={isLoading}>
          {isLoading ? "Logging Out..." : "Logout"}
        </button>) : (<button className="" onClick={() => loginAsGuest()}>
          Login as Guest
        </button>)}
      {isError && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>);
};
exports.LoginAsGuestButton = LoginAsGuestButton;

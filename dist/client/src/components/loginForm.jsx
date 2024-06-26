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
exports.LoginForm = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const authStore_1 = require("../lib/authStore");
const validations_1 = require("../lib/validations");
const LoginForm = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const login = (0, authStore_1.useAuthStore)((state) => state.login);
    const isAuthenticated = (0, authStore_1.useAuthStore)((state) => state.isAuthenticated);
    const isLoading = (0, authStore_1.useAuthStore)((state) => state.isLoading);
    const isError = (0, authStore_1.useAuthStore)((state) => state.isError);
    const errorMessage = (0, authStore_1.useAuthStore)((state) => state.errorMessage);
    const user = (0, authStore_1.useAuthStore)((state) => state.user);
    (0, react_1.useEffect)(() => {
        if (user && isAuthenticated) {
            navigate("/");
        }
    }, [user, isAuthenticated, navigate, isError, errorMessage]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleLogin = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const loginData = { email, password };
        const result = validations_1.loginSchema.safeParse(loginData);
        if (!result.success) {
            const errorMessages = result.error.errors.map((error) => error.message);
            alert(errorMessages.join("\n"));
            return;
        }
        login(loginData);
    });
    return (<div className="flex flex-col items-center p-10 space-y-5">
      <h2 className="text-2xl font-sans font-semibold">
        Log in to make the best of Task Taker
      </h2>
      <div className="flex flex-col items-center">
        <form onSubmit={handleLogin} className="flex flex-col space-y-3">
          <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="email" placeholder="hulk@hogan.com" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} required/>
          <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="password" autoComplete="current-password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required min={5}/>
          <button className="p-3 rounded-md bg-emerald-600 text-white" type="submit" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Log In"}
          </button>
          {isError && (<p className="text-red-500 text-sm">{`Error: ${errorMessage}`}</p>)}
          <p className="text-sm">
            Don't have an account?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>
              Register here
            </span>
          </p>
        </form>
      </div>
    </div>);
};
exports.LoginForm = LoginForm;

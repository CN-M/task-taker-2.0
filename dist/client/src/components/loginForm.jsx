"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginForm = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const authStore_1 = require("../lib/authStore");
const LoginForm = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const login = (0, authStore_1.useAuthStore)((state) => state.login);
    const isAuthenticated = (0, authStore_1.useAuthStore)((state) => state.isAuthenticated);
    const user = (0, authStore_1.useAuthStore)((state) => state.user);
    (0, react_1.useEffect)(() => {
        if (user && isAuthenticated) {
            navigate("/");
        }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleLogin = (e) => {
        e.preventDefault();
        try {
            login({ email, password });
        }
        catch (err) {
            console.error("Error", err);
        }
    };
    return (<div className="flex flex-col p-10 space-y-5">
      <h1>Log In</h1>
      <h2 className="text-xl font-sans">
        Log in to make the best of Task Taker
      </h2>
      <div className="flex flex-col items-center">
        <form onSubmit={handleLogin} className="flex flex-col space-y-3">
          <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="email" placeholder="hulk@hogan.com" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} required/>
          <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="password" autoComplete="current-password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <button className="p-3 rounded-md bg-emerald-600 text-white" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>);
};
exports.LoginForm = LoginForm;

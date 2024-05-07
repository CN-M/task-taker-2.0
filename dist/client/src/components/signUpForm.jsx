"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpForm = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const authStore_1 = require("../lib/authStore");
const SignUpForm = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [firstName, setFirstname] = (0, react_1.useState)("");
    const [lastName, setLastname] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const register = (0, authStore_1.useAuthStore)((state) => state.register);
    const isAuthenticated = (0, authStore_1.useAuthStore)((state) => state.isAuthenticated);
    const user = (0, authStore_1.useAuthStore)((state) => state.user);
    (0, react_1.useEffect)(() => {
        if (user && isAuthenticated) {
            navigate("/");
        }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRegister = (e) => {
        e.preventDefault();
        try {
            register({ email, firstName, lastName, password });
        }
        catch (err) {
            console.error("Error", err);
        }
    };
    return (<div className="flex flex-col p-10 space-y-5">
      <h1>Sign Up</h1>
      <h2 className="text-xl font-sans">
        Don't have an account? Sign up to make the best of Task Taker
      </h2>
      <div className="flex flex-col items-center">
        <form onSubmit={handleRegister} className="flex flex-col space-y-3">
          <div className="flex gap-2 justify-between">
            <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="text" placeholder="Ntsako" value={firstName} onChange={(e) => setFirstname(e.target.value)} required/>
            <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="text" placeholder="Mbhalati" value={lastName} onChange={(e) => setLastname(e.target.value)} required/>
          </div>
          <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="email" placeholder="hulk@hogan.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="password" placeholder="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <button className="p-3 rounded-md bg-emerald-600 text-white" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>);
};
exports.SignUpForm = SignUpForm;

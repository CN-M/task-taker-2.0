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
exports.SignUpForm = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const authStore_1 = require("../lib/authStore");
const validations_1 = require("../lib/validations");
const SignUpForm = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [firstName, setFirstname] = (0, react_1.useState)("");
    const [lastName, setLastname] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const isError = (0, authStore_1.useAuthStore)((state) => state.isError);
    const errorMessage = (0, authStore_1.useAuthStore)((state) => state.errorMessage);
    const register = (0, authStore_1.useAuthStore)((state) => state.register);
    const isAuthenticated = (0, authStore_1.useAuthStore)((state) => state.isAuthenticated);
    const isLoading = (0, authStore_1.useAuthStore)((state) => state.isLoading);
    const user = (0, authStore_1.useAuthStore)((state) => state.user);
    (0, react_1.useEffect)(() => {
        if (user && isAuthenticated) {
            navigate("/");
        }
    }, [user, isAuthenticated, navigate, isError, errorMessage]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRegister = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const registerData = { firstName, lastName, email, password };
        const result = validations_1.registerSchema.safeParse(registerData);
        if (!result.success) {
            const errorMessages = result.error.errors.map((error) => error.message);
            alert(errorMessages.join("\n"));
            return;
        }
        register(registerData);
    });
    return (<div className="flex flex-col p-10 items-center space-y-5">
      <h2 className="text-2xl font-sans font-semibold">
        Don't have an account?
      </h2>
      <h2 className="text-2xl font-sans font-semibold">
        Sign up to make the best of Task Taker
      </h2>
      <div className="flex flex-col items-center">
        <form onSubmit={handleRegister} className="flex flex-col space-y-3">
          <div className="flex gap-2 justify-between">
            <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="text" placeholder="Jack" value={firstName} onChange={(e) => setFirstname(e.target.value)} required min={1}/>
            <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="text" placeholder="Sparrow" value={lastName} onChange={(e) => setLastname(e.target.value)} required min={1}/>
          </div>
          <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="email" placeholder="hulk@hogan.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="password" placeholder="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required min={5}/>
          <button className="p-3 rounded-md bg-emerald-600 text-white" type="submit" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          {isError && (<p className="text-red-500 text-sm">{`Error: ${errorMessage}`}</p>)}
          <p className="text-sm">
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>);
};
exports.SignUpForm = SignUpForm;

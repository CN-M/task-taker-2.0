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
const SignUpForm = () => {
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const signUp = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:3000/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                throw new Error("Failed to sign user up!");
            }
            const data = yield res.json();
            console.log(data);
            return data;
        }
        catch (err) {
            console.error("Error:", err);
        }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTask = (e) => {
        e.preventDefault();
        signUp();
        setEmail("");
        setPassword("");
    };
    return (<div className="flex flex-col p-10 space-y-5">
      <h1>Sign Up</h1>
      <h2 className="text-xl font-sans">
        Don't have an account? Sign up to make the best of Task Taker
      </h2>
      <div className="flex flex-col items-center">
        <form onSubmit={handleTask} className="flex flex-col space-y-3">
          <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="email" placeholder="hulk@hogan.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className="p-3 rounded-md bg-emerald-600 text-white" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>);
};
exports.SignUpForm = SignUpForm;

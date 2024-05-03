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
require("./App.css");
const react_1 = require("react");
const addTask_1 = require("./components/addTask");
const display_1 = require("./components/display");
const loginForm_1 = require("./components/loginForm");
const signUpForm_1 = require("./components/signUpForm");
function App() {
    const [task, setTask] = (0, react_1.useState)("");
    const [todos, setTodos] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [user, setUser] = (0, react_1.useState)({});
    (0, react_1.useEffect)(() => {
        const getCurrentUser = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch("http://localhost:3000/users/current");
                const data = yield res.json();
                setUser(data);
                console.log(data); // Log the updated user data
            }
            catch (error) {
                console.error("Error fetching current user:", error);
            }
        });
        getCurrentUser();
    }, []);
    return (<div className="h-full w-full flex flex-col justify-center space-y-4">
      <h1>Task Taker</h1>
      <p>Hint: Double click on a task to cross it out</p>
      {user ? <h1>Hello {user.email} </h1> : <h1>Please Log in</h1>}
      <display_1.Display todos={todos} setTodos={setTodos} isLoading={isLoading} setIsLoading={setIsLoading}/>
      <addTask_1.AddTask task={task} setTask={setTask} todos={todos} setTodos={setTodos}/>
      <loginForm_1.LoginForm />
      <signUpForm_1.SignUpForm />
    </div>);
}
exports.default = App;

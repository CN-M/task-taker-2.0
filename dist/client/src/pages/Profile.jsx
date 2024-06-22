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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_router_dom_1 = require("react-router-dom");
const authStore_1 = require("../lib/authStore");
const Profile = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const user = (0, authStore_1.useAuthStore)((state) => state.user);
    const isAuthenticated = (0, authStore_1.useAuthStore)((state) => state.isAuthenticated);
    (0, react_1.useEffect)(() => {
        if (!user && isAuthenticated == false) {
            navigate("/login");
        }
    });
    const addTask = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!user || !user.token) {
                throw new Error("User not authenticated or token not available.");
            }
            const res = yield fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ task }),
            });
            if (!res.ok) {
                throw new Error("Failed to add task!");
            }
            const data = yield res.json();
            const newTodo = {
                id: data.id,
                task: task,
            };
            setTodos([...todos, newTodo]);
            setTask("");
            return data;
        }
        catch (err) {
            console.error("Error:", err);
            react_hot_toast_1.default.error("Error adding task");
        }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e) => {
        setTask(e.target.value);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTask = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        yield addTask();
    });
    return (<>
      {user && isAuthenticated ? (<h2 className="text-xl p-5 font-semibold">
          Hey, {user.firstName} {user.lastName}
        </h2>) : (<></>)}

      <form onSubmit={handleTask} className="flex flex-col space-y-3">
        <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="text" placeholder="Take out the trash" value={task} onChange={handleChange} required/>
        <button className="p-3 rounded-md bg-emerald-600 text-white" type="submit">
          Add Task
        </button>
      </form>
    </>);
};
exports.Profile = Profile;

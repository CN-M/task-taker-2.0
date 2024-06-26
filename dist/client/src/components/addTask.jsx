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
exports.AddTask = void 0;
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const authStore_1 = require("../lib/authStore");
const validations_1 = require("../lib/validations");
const AddTask = ({ task, setTask, todos, setTodos, }) => {
    const user = (0, authStore_1.useAuthStore)((state) => state.user);
    const addTask = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!user || !user.accessToken) {
                throw new Error("User not authenticated or token not available.");
            }
            const parsedData = validations_1.taskSchema.safeParse({ task });
            if (!parsedData.success) {
                const errorMessages = parsedData.error.errors.map((error) => error.message);
                throw new Error(errorMessages.join(", "));
            }
            const res = yield fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.accessToken}`,
                },
                body: JSON.stringify({ task: parsedData.data.task }),
                credentials: "include",
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
            react_hot_toast_1.default.error(err.message || "Error adding task");
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
    return (<div className="flex flex-col p-10 space-y-5">
      <form onSubmit={handleTask} className="flex flex-col space-y-3">
        <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="text" placeholder="Take out the trash" value={task} onChange={handleChange} required min={1}/>
        <button className="p-3 rounded-md bg-emerald-600 text-white" type="submit">
          Add Task
        </button>
      </form>
    </div>);
};
exports.AddTask = AddTask;

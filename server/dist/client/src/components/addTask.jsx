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
exports.AddTask = void 0;
const AddTask = ({ task, setTask, todos, setTodos, }) => {
    const addTask = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task, email: "cn@gmail.com" }),
            });
            if (!res.ok) {
                throw new Error("Failed to add task!");
            }
            const data = yield res.json();
            // const newTodo: Todo = {
            const newTodo = {
                id: data.id,
                task: task,
            };
            setTodos([...todos, newTodo]);
            return data;
        }
        catch (err) {
            console.error("Error:", err);
        }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e) => {
        setTask(e.target.value);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTask = (e) => {
        e.preventDefault();
        addTask();
        setTask("");
    };
    return (<div className="flex flex-col p-10 space-y-5">
      <form onSubmit={handleTask} className="flex flex-col space-y-3">
        <input className="border p-2 border-emerald-500 rounded-md focus:border-blue-500" type="text" placeholder="Take out the trash" value={task} onChange={handleChange}/>
        <button className="p-3 rounded-md bg-emerald-600 text-white" type="submit">
          Add Task
        </button>
      </form>
    </div>);
};
exports.AddTask = AddTask;

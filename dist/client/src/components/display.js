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
exports.Display = void 0;
const react_1 = require("react");
const utils_1 = require("../lib/utils");
const Display = ({ todos, setTodos, isLoading, setIsLoading, }) => {
    const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            todos.splice(id, 1);
            setTodos([...todos]);
            const data = yield res.json();
            return data;
        }
        catch (err) {
            console.error("Error:", err);
        }
    });
    const updateTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield fetch("http://localhost:3000/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            todos[id].completed = !todos[id].completed;
            setTodos([...todos]);
            const data = yield res.json();
            return data;
        }
        catch (err) {
            console.error("Error:", err);
        }
    });
    (0, react_1.useEffect)(() => {
        const getData = () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield fetch("http://localhost:3000/");
            const data = yield res.json();
            console.log(data);
            setTodos(data);
            setIsLoading(false);
        });
        getData();
    }, [setIsLoading, setTodos]);
    return (React.createElement("div", { className: " " },
        React.createElement("div", { className: "space-y-3" }, isLoading ? (React.createElement("p", null, "Loading tasks...")) : (React.createElement(React.Fragment, null, todos.length < 1 ? (React.createElement("h3", null, "You have no tasks to display")) : (todos === null || todos === void 0 ? void 0 : todos.map((todo, id) => (React.createElement("div", { key: id, onDoubleClick: () => updateTask(id), className: "border rounded-md p-3 border-emerald-300" },
            React.createElement("div", { className: "flex justify-around py-2 px-10 gap-3 hover:cursor-pointer" },
                React.createElement("p", { className: (0, utils_1.cn)("text-2xl", todo.completed ? "line-through" : "") }, todo.task),
                React.createElement("button", { onClick: () => deleteTask(id), className: "bg-red-500 text-sm text-white tracking-widest border-none hover:bg-red-400" }, "Delete")))))))))));
};
exports.Display = Display;

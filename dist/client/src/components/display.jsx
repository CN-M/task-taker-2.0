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
const react_router_dom_1 = require("react-router-dom");
const authStore_1 = require("../lib/authStore");
const utils_1 = require("../lib/utils");
const Display = ({ todos, setTodos, isLoading, setIsLoading, }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const user = (0, authStore_1.useAuthStore)((state) => state.user);
    const isAuthenticated = (0, authStore_1.useAuthStore)((state) => state.isAuthenticated);
    // console.log(user);
    const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield fetch(`http://localhost:3000/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user === null || user === void 0 ? void 0 : user.token}`,
                },
                body: JSON.stringify({ id }),
            });
            if (res.ok) {
                const result = todos.filter((todo) => todo.id !== id);
                setTodos(result);
            }
            const data = yield res.json();
            return data;
        }
        catch (err) {
            console.error("Error:", err);
        }
    });
    const updateTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield fetch(`http://localhost:3000/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user === null || user === void 0 ? void 0 : user.token}`,
                },
            });
            if (res.ok) {
                const result = todos.map((todo) => todo.id === id ? Object.assign(Object.assign({}, todo), { completed: !todo.completed }) : todo);
                setTodos(result);
            }
            const data = yield res.json();
            return data;
        }
        catch (err) {
            console.error("Error:", err);
        }
    });
    (0, react_1.useEffect)(() => {
        const getData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield fetch("http://localhost:3000/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user === null || user === void 0 ? void 0 : user.token}`,
                    },
                });
                const data = yield res.json();
                setTodos(data);
                setIsLoading(false);
            }
            catch (err) {
                console.error("Error", err);
                setIsLoading(false);
            }
        });
        if (!user && isAuthenticated == false) {
            navigate("/login");
        }
        else {
            getData();
        }
    }, [user, isAuthenticated, navigate, setIsLoading, setTodos]);
    return (<div className=" ">
      {user && isAuthenticated ? (<div className="text-xl p-5">
          Hello, {user.firstName}. Here are your tasks:
        </div>) : (<></>)}
      <div className="space-y-3">
        {isLoading ? (<p>Loading tasks...</p>) : (<>
            {(todos === null || todos === void 0 ? void 0 : todos.length) < 1 ? (<h3>You have no tasks to display</h3>) : (todos === null || todos === void 0 ? void 0 : todos.map(({ task, id, completed }) => (<div key={id} onDoubleClick={() => updateTask(id)} className="border rounded-md p-3 border-emerald-300">
                  <div className="flex justify-around py-2 px-10 gap-3 hover:cursor-pointer">
                    <p className={(0, utils_1.cn)("text-2xl", completed ? "line-through" : "")}>
                      {task}
                    </p>
                    <button onClick={() => deleteTask(id)} className="bg-red-500 text-sm text-white tracking-widest border-none hover:bg-red-400">
                      Delete
                    </button>
                  </div>
                </div>)))}
          </>)}
      </div>
    </div>);
};
exports.Display = Display;

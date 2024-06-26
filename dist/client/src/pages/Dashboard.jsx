"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const react_1 = require("react");
const addTask_1 = require("../components/addTask");
const display_1 = require("../components/display");
const Dashboard = () => {
    const [task, setTask] = (0, react_1.useState)("");
    const [todos, setTodos] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    return (<>
      <div>
        <display_1.Display todos={todos} setTodos={setTodos} isLoading={isLoading} setIsLoading={setIsLoading}/>
        <addTask_1.AddTask task={task} setTask={setTask} todos={todos} setTodos={setTodos}/>
      </div>
    </>);
};
exports.Dashboard = Dashboard;
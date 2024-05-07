"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const react_1 = require("react");
const addTask_1 = require("../components/addTask");
const display_1 = require("../components/display");
const logoutButton_1 = require("../components/logoutButton");
const Dashboard = () => {
    const [task, setTask] = (0, react_1.useState)("");
    const [todos, setTodos] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    return (<>
      <logoutButton_1.LogoutButton />
      <display_1.Display todos={todos} setTodos={setTodos} isLoading={isLoading} setIsLoading={setIsLoading}/>
      <addTask_1.AddTask task={task} setTask={setTask} todos={todos} setTodos={setTodos}/>
    </>);
};
exports.Dashboard = Dashboard;

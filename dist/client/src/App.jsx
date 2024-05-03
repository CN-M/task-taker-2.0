"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const react_1 = require("react");
const addTask_1 = require("./components/addTask");
const display_1 = require("./components/display");
function App() {
    const [task, setTask] = (0, react_1.useState)("");
    const [todos, setTodos] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    return (<div className="h-full w-full flex flex-col justify-center space-y-4">
      <h1>Task Taker</h1>
      <p>Hint: Double click on a task to cross it out</p>
      <display_1.Display todos={todos} setTodos={setTodos} isLoading={isLoading} setIsLoading={setIsLoading}/>
      <addTask_1.AddTask task={task} setTask={setTask} todos={todos} setTodos={setTodos}/>
    </div>);
}
exports.default = App;

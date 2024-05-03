"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const App_js_1 = __importDefault(require("./App.js"));
require("./index.css");
client_1.default.createRoot(document.getElementById("root")).render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(App_js_1.default, null)));

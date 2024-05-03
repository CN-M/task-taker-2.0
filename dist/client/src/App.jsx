"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
const Dashboard_1 = require("./pages/Dashboard");
const Login_1 = require("./pages/Login");
const Register_1 = require("./pages/Register");
function App() {
    return (<>
      <react_router_dom_1.BrowserRouter>
        <div className="h-full w-full flex flex-col justify-center space-y-4"></div>
        <h1>Task Taker</h1>
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/" element={<Dashboard_1.Dashboard />}/>
          <react_router_dom_1.Route path="/login" element={<Login_1.Login />}/>
          <react_router_dom_1.Route path="/register" element={<Register_1.Register />}/>
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </>);
}
exports.default = App;

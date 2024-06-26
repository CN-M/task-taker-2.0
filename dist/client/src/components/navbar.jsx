"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
const react_router_dom_1 = require("react-router-dom");
const authButton_1 = require("./authButton");
const loginAsGuestButton_1 = require("./loginAsGuestButton");
const Navbar = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<nav className="bg-gray-800 p-4 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <button onClick={() => navigate("/")} className="text-white text-2xl font-bold">
              Task Taker
            </button>
          </div>
          <div className="flex space-x-4 items-center">
            <loginAsGuestButton_1.LoginAsGuestButton />
            <authButton_1.AuthButton />
          </div>
        </div>
      </div>
    </nav>);
};
exports.Navbar = Navbar;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
const authButton_1 = require("./authButton");
const Navbar = () => {
    return (<nav className="bg-gray-800 p-4 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <h1 className="text-white text-2xl font-bold">Task Taker</h1>
          </div>
          <div className="flex space-x-4 items-center">
            <authButton_1.AuthButton />
          </div>
        </div>
      </div>
    </nav>);
};
exports.Navbar = Navbar;

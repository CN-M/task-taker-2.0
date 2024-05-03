"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BearDisplay = void 0;
const bearStore_1 = require("../lib/bearStore");
const BearDisplay = () => {
    const bears = (0, bearStore_1.useBearStore)((state) => state.bears);
    const increment = (0, bearStore_1.useBearStore)((state) => state.increment);
    const decrement = (0, bearStore_1.useBearStore)((state) => state.decrement);
    const extinct = (0, bearStore_1.useBearStore)((state) => state.extinct);
    return (<div className="">
      <h1>Number of bears: {bears}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={extinct}>Extinct</button>
    </div>);
};
exports.BearDisplay = BearDisplay;

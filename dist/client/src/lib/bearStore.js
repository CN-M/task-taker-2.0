"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBearStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
exports.useBearStore = (0, zustand_1.create)()((0, middleware_1.devtools)((0, middleware_1.persist)((set) => ({
    bears: 0,
    increment: () => set((state) => ({ bears: state.bears + 1 })),
    decrement: () => set((state) => ({ bears: state.bears - 1 })),
    extinct: () => set(() => ({ bears: 0 })),
}), {
    name: "bear-storage",
})));

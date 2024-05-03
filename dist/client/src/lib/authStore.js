"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthStore = void 0;
const zustand_1 = require("zustand");
exports.useAuthStore = (0, zustand_1.create)((set) => ({
    isAuthenticated: false,
    user: null,
    login: (userData) => set({ isAuthenticated: true, user: userData }),
    logout: () => set({ isAuthenticated: false, user: null }),
    register: (userData) => {
        // Here you can perform your registration logic, like sending data to a backend API
        // For simplicity, we'll just log the user data to the console
        console.log("Registered user:", userData);
        // Assuming successful registration, log the user in
        set({ isAuthenticated: true, user: userData });
    },
}));

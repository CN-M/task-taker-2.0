"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthStore = void 0;
const axios_1 = __importDefault(require("axios"));
const zustand_1 = require("zustand");
const user = JSON.parse(localStorage.getItem("user"));
// type StateState = {
//   user: User | null;
//   isError: boolean;
//   isSuccess: boolean;
//   isLoading: boolean;
//   message: string;
// };
// const initialState: StateState = {
//   user: user ? user : null,
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: "",
// };
exports.useAuthStore = (0, zustand_1.create)((set) => ({
    isAuthenticated: user ? true : false,
    user: user ? user : null,
    isError: false,
    login: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield login(userData);
            set({ isAuthenticated: true, user: data });
        }
        catch (err) {
            set({ isError: true });
        }
    }),
    register: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield register(userData);
            console.log("Registered user:", data);
            set({ isAuthenticated: true, user: data });
        }
        catch (err) {
            set({ isError: true });
        }
    }),
    logout: () => {
        try {
            logout();
            set({ isAuthenticated: false, user: null });
        }
        catch (err) {
            set({ isError: true });
        }
    },
}));
const register = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post("http://localhost:3000/account/register", userData);
    if (response.data) {
        const { data } = response;
        localStorage.setItem("user", JSON.stringify(data));
    }
    return response.data;
});
const login = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post("http://localhost:3000/account/login", userData);
    if (response.data) {
        const { data } = response;
        localStorage.setItem("user", JSON.stringify(data));
    }
    return response.data;
});
const logout = () => {
    localStorage.removeItem("user");
};

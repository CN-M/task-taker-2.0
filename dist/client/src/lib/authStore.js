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
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const zustand_1 = require("zustand");
const user = JSON.parse(localStorage.getItem("user"));
exports.useAuthStore = (0, zustand_1.create)((set) => ({
    isAuthenticated: user ? true : false,
    isError: false,
    isLoading: false,
    user: user ? user : null,
    errorMessage: "",
    login: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        set({ isLoading: true, isError: false, errorMessage: "" });
        try {
            const data = yield login(userData);
            set({ isAuthenticated: true, user: data });
            react_hot_toast_1.default.success("Successfully logged in!");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (err) {
            const { error } = err.response.data;
            set({
                isError: true,
                errorMessage: err.response.data.error || "An error occurred during login",
            });
            react_hot_toast_1.default.error(error);
        }
        finally {
            set({ isLoading: false });
        }
    }),
    register: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        set({ isLoading: true, isError: false, errorMessage: "" });
        try {
            const data = yield register(userData);
            set({ isAuthenticated: true, user: data });
            react_hot_toast_1.default.success("User successfully registered!");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (err) {
            const { error } = err.response.data;
            set({
                isError: true,
                errorMessage: err.response.data.error || "An error occurred during registration",
            });
            react_hot_toast_1.default.error(error);
        }
        finally {
            set({ isLoading: false });
        }
    }),
    logout: () => __awaiter(void 0, void 0, void 0, function* () {
        set({ isLoading: true, isError: false, errorMessage: "" });
        try {
            yield logout();
            set({ isAuthenticated: false, user: null });
            react_hot_toast_1.default.success("Successfully logged out!");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (err) {
            const { error } = err.response.data;
            set({
                isError: true,
                errorMessage: error || "An error occurred during logout",
            });
            react_hot_toast_1.default.error(error);
        }
        finally {
            set({ isLoading: false });
        }
    }),
}));
const register = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post("http://localhost:3000/account/register", userData, { withCredentials: true });
    if (response.data) {
        const { data } = response;
        localStorage.setItem("user", JSON.stringify(data));
        return data;
    }
    else {
        throw new Error("Registration failed");
    }
});
const login = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post("http://localhost:3000/account/login", userData, { withCredentials: true });
    if (response.data) {
        const { data } = response;
        localStorage.setItem("user", JSON.stringify(Object.assign(Object.assign({}, data), { timestamp: new Date().getTime() })));
        return data;
    }
    else {
        throw new Error("Login failed");
    }
});
const logout = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post("http://localhost:3000/account/logout", {
        withCredentials: true,
    });
    if (response.data) {
        const { data } = response;
        localStorage.removeItem("user");
        return data;
    }
    else {
        throw new Error("Logout failed");
    }
});

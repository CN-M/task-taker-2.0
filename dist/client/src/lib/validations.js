"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email addres" }),
    password: zod_1.z
        .string()
        .min(5, { message: "Password must be at least 5 characters long" }),
});
exports.registerSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: "First name is required" }),
    lastName: zod_1.z.string().min(1, { message: "Last name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z
        .string()
        .min(5, { message: "Password must be at least 5 characters" }),
});
exports.taskSchema = zod_1.z.object({
    task: zod_1.z.string().min(1, { message: "Task is required" }),
});

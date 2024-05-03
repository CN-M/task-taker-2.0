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
exports.deleteUser = exports.updateUser = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
require("dotenv").config();
const { SECRET } = process.env;
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, SECRET, { expiresIn: "5d" });
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, firstName, lastName, password } = req.body;
        if (!email || !firstName || !lastName || !password) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }
        const userExists = yield db_1.prisma.user.findFirst({
            where: { email },
        });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const newUser = yield db_1.prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
        });
        if (newUser) {
            const { id, firstName, lastName, email } = newUser;
            const token = generateToken(id);
            return res.status(201).json({
                id,
                firstName,
                lastName,
                email,
                token,
            });
        }
        else {
            return res.status(400).json({ error: "Invalid user data" });
        }
    }
    catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }
        const user = yield db_1.prisma.user.findFirst({
            where: { email },
        });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const { id, firstName, lastName, email: userEmail } = user;
        const token = generateToken(id);
        return res.status(201).json({
            id,
            firstName,
            lastName,
            email: userEmail,
            token,
        });
    }
    catch (err) {
        console.error("Error logging in user:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.loginUser = loginUser;
// export const getAllUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.status(200).json(users);
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// export const getOneUser = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const user = await prisma.user.findFirst({
//       where: { id: Number(id) },
//     });
//     res.status(200).json(user);
//   } catch (err) {
//     console.error("Error fetching user data:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName } = req.body;
        if (!req.user) {
            return res
                .status(400)
                .json({ error: "Not authoriized, please login or register" });
        }
        const { id: userId } = req.user;
        const updatedUser = yield db_1.prisma.user.update({
            where: { id: userId },
            data: {
                firstName,
                lastName,
            },
            select: { firstName: true, lastName: true, email: true },
        });
        res.status(200).json(updatedUser);
    }
    catch (err) {
        console.error("Error updating user data:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res
            .status(400)
            .json({ error: "Not authoriized, please login or register" });
    }
    const { id: userId } = req.user;
    try {
        const deletedUser = yield db_1.prisma.user.delete({
            where: { id: userId },
            select: { firstName: true, lastName: true, email: true },
        });
        res.status(200).json({ message: "User deleted", user: deletedUser });
    }
    catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.deleteUser = deleteUser;

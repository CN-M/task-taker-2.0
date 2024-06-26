"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.refreshUser = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const util_1 = require("../config/util");
const validations_1 = require("../config/validations");
require("dotenv").config();
const { REFRESH_SECRET, NODE_ENV } = process.env;
require("dotenv").config();
const registerUser = async (req, res) => {
    try {
        const parsedData = validations_1.registerSchema.safeParse(req.body);
        if (!parsedData.success) {
            const errorMessages = parsedData.error.errors.map((error) => error.message);
            return res.status(400).json({ error: errorMessages.join(", ") });
        }
        const { email, firstName, lastName, password } = parsedData.data;
        if (!email || !firstName || !lastName || !password) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }
        const userExists = await db_1.prisma.user.findFirst({
            where: { email },
        });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const newUser = await db_1.prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
        });
        if (newUser) {
            const { id, firstName, lastName, email } = newUser;
            const accessToken = (0, util_1.generateAccessToken)({
                id,
                firstName,
                lastName,
                email,
            });
            const refreshToken = (0, util_1.generateRefreshToken)({
                id,
                firstName,
                lastName,
                email,
            });
            res
                .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 15 * 24 * 60 * 60 * 1000, // 15 Days
            })
                .header("authorization", accessToken);
            return res.status(201).json({
                id,
                firstName,
                lastName,
                email,
                accessToken,
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
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const parsedData = validations_1.loginSchema.safeParse(req.body);
        if (!parsedData.success) {
            const errorMessages = parsedData.error.errors.map((error) => error.message);
            return res.status(400).json({ error: errorMessages.join(", ") });
        }
        const { email, password } = parsedData.data;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }
        const user = await db_1.prisma.user.findFirst({
            where: { email },
        });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const { id, firstName, lastName, email: userEmail } = user;
        const accessToken = (0, util_1.generateAccessToken)({
            id,
            firstName,
            lastName,
            email,
        });
        const refreshToken = (0, util_1.generateRefreshToken)({
            id,
            firstName,
            lastName,
            email,
        });
        res
            .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 Days
        })
            .header("authorization", accessToken);
        return res.status(201).json({
            id,
            firstName,
            lastName,
            email: userEmail,
            accessToken,
        });
    }
    catch (err) {
        console.error("Error logging in user:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.loginUser = loginUser;
const logoutUser = async (req, res) => {
    try {
        console.log("logout console:", req.cookies["refreshToken"]);
        res.clearCookie("refreshToken");
        return res.status(200).json({ message: "User successfully logged out" });
    }
    catch (err) {
        console.error("Error logging out user:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.logoutUser = logoutUser;
const refreshUser = async (req, res) => {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
        return res.status(401).json({ error: "Not authorised, no refresh token!" });
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(refreshToken, REFRESH_SECRET);
        const user = await db_1.prisma.user.findFirst({
            where: { id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                password: false,
            },
        });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const newAccessToken = (0, util_1.generateAccessToken)(user);
        console.log("New User successfully refreshed");
        res.header("authorization", newAccessToken);
        req.user = user;
    }
    catch (err) {
        console.error("Error:", err);
        return res.status(401).json({ error: "Invalid refresh token" });
    }
};
exports.refreshUser = refreshUser;
const updateUser = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;
        if (!req.user) {
            return res
                .status(400)
                .json({ error: "Not authoriized, please login or register" });
        }
        const { id: userId } = req.user;
        const updatedUser = await db_1.prisma.user.update({
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
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    if (!req.user) {
        return res
            .status(400)
            .json({ error: "Not authoriized, please login or register" });
    }
    const { id: userId } = req.user;
    try {
        const deletedUser = await db_1.prisma.user.delete({
            where: { id: userId },
            select: { firstName: true, lastName: true, email: true },
        });
        res.status(200).json({ message: "User deleted", user: deletedUser });
    }
    catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Internal server error." });
    }
};
exports.deleteUser = deleteUser;

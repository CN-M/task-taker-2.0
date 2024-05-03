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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getOneUser = exports.getAllUsers = exports.getCurrentUser = void 0;
const db_1 = require("../config/db");
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        console.log(user);
        res.status(200).json(user);
    }
    catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getCurrentUser = getCurrentUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.prisma.user.findMany();
        res.status(200).json(users);
    }
    catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield db_1.prisma.user.findFirst({
            where: { id: Number(id) },
        });
        res.status(200).json(user);
    }
    catch (err) {
        console.error("Error fetching user data:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getOneUser = getOneUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield db_1.prisma.user.create({
            data: {
                email,
                password,
            },
        });
        res.status(200).json(user);
    }
    catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, email, password } = req.body;
        const updatedUser = yield db_1.prisma.user.update({
            where: { id: Number(id) },
            data: {
                email,
                password,
            },
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
    try {
        const { id } = req.body;
        const deletedUser = yield db_1.prisma.user.delete({
            where: { id: Number(id) },
        });
        res.status(200).json(deletedUser);
    }
    catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteUser = deleteUser;

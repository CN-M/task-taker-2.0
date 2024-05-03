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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getAllTasks = void 0;
const db_1 = require("../config/db");
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield db_1.prisma.task.findMany({
            include: { author: true },
        });
        res.status(200).json(tasks);
    }
    catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.getAllTasks = getAllTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task, email } = req.body;
    try {
        const newTask = yield db_1.prisma.task.create({
            data: {
                task,
                author: { connect: { email } },
            },
        });
        res.status(200).json(newTask);
    }
    catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const task = yield db_1.prisma.task.findFirst({ where: { id: Number(id) } });
        const updatedTask = yield db_1.prisma.task.update({
            where: { id: Number(id) },
            data: {
                completed: !(task === null || task === void 0 ? void 0 : task.completed),
            },
        });
        res.status(200).json(updatedTask);
    }
    catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const deletedTask = yield db_1.prisma.task.delete({
            where: { id: Number(id) },
        });
        res.status(200).json(deletedTask);
    }
    catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.deleteTask = deleteTask;

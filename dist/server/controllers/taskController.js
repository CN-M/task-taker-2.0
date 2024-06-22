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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const db_1 = require("../config/db");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res
            .status(400)
            .json({ error: "Not authoriized, please login or register" });
    }
    const { id } = req.user;
    try {
        const tasks = yield db_1.prisma.task.findMany({
            where: { authorId: id },
        });
        res.status(200).json(tasks);
        // }
    }
    catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task } = req.body;
    if (!req.user) {
        return res
            .status(400)
            .json({ error: "Not authoriized, please login or register" });
    }
    const { id: userId } = req.user;
    try {
        const newTask = yield db_1.prisma.task.create({
            data: {
                task,
                author: { connect: { id: userId } },
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
    const { id: taskId } = req.params;
    if (!req.user) {
        return res
            .status(400)
            .json({ error: "Not authoriized, please login or register" });
    }
    const { id: userId } = req.user;
    try {
        const task = yield db_1.prisma.task.findFirst({
            where: { id: Number(taskId), authorId: userId },
        });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        const updatedTask = yield db_1.prisma.task.update({
            where: { id: Number(taskId) },
            data: {
                completed: !(task === null || task === void 0 ? void 0 : task.completed),
            },
        });
        res.status(200).json(updatedTask);
    }
    catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskId } = req.params;
    if (!req.user) {
        return res
            .status(400)
            .json({ error: "Not authoriized, please login or register" });
    }
    const { id: userId } = req.user;
    try {
        const task = yield db_1.prisma.task.findFirst({
            where: { id: Number(taskId), authorId: userId },
        });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        const deletedTask = yield db_1.prisma.task.delete({
            where: { id: Number(taskId), authorId: userId },
        });
        res.status(200).json({ message: "Task deleted", task: deletedTask });
    }
    catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.deleteTask = deleteTask;

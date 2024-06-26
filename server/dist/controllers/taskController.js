"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const db_1 = require("../config/db");
const validations_1 = require("../config/validations");
const getTasks = async (req, res) => {
    if (!req.user) {
        return res
            .status(400)
            .json({ error: "Not authoriized, please login or register" });
    }
    const { id } = req.user;
    try {
        const tasks = await db_1.prisma.task.findMany({
            where: { authorId: id },
        });
        res.status(200).json(tasks);
    }
    catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Internal server error." });
    }
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    if (!req.user) {
        return res
            .status(400)
            .json({ error: "Not authoriized, please login or register" });
    }
    const parsedData = validations_1.taskSchema.safeParse(req.body);
    if (!parsedData.success) {
        const errorMessages = parsedData.error.errors.map((error) => error.message);
        return res.status(400).json({ error: errorMessages.join(", ") });
    }
    const { task } = parsedData.data;
    const { id: userId } = req.user;
    try {
        const newTask = await db_1.prisma.task.create({
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
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    if (!req.user) {
        return res
            .status(400)
            .json({ error: "Not authoriized, please login or register" });
    }
    const { id: taskId } = req.params;
    const { id: userId } = req.user;
    try {
        const task = await db_1.prisma.task.findFirst({
            where: { id: Number(taskId), authorId: userId },
        });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        const updatedTask = await db_1.prisma.task.update({
            where: { id: Number(taskId) },
            data: {
                completed: !task?.completed,
            },
        });
        res.status(200).json(updatedTask);
    }
    catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ error: "Internal server error." });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    if (!req.user) {
        return res
            .status(400)
            .json({ error: "Not authoriized, please login or register" });
    }
    const { id: taskId } = req.params;
    const { id: userId } = req.user;
    try {
        const task = await db_1.prisma.task.findFirst({
            where: { id: Number(taskId), authorId: userId },
        });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        const deletedTask = await db_1.prisma.task.delete({
            where: { id: Number(taskId), authorId: userId },
        });
        res.status(200).json({ message: "Task deleted", task: deletedTask });
    }
    catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Internal server error." });
    }
};
exports.deleteTask = deleteTask;

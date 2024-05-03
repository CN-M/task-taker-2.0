"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const taskController_1 = require("../controllers/taskController");
router.route("/").get(taskController_1.getAllTasks).post(taskController_1.createTask);
router.route("/").put(taskController_1.updateTask).delete(taskController_1.deleteTask);
exports.default = router;

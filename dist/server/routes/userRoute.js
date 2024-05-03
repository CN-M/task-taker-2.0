"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
router.route("/").get(userController_1.getAllUsers).post(userController_1.createUser);
router.route("/:id").get(userController_1.getOneUser).put(userController_1.updateUser).delete(userController_1.deleteUser);
exports.default = router;

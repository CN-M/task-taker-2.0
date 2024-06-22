"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
router.route("/").delete(authMiddleware_1.protect, userController_1.deleteUser).put(authMiddleware_1.protect, userController_1.updateUser);
router.route("/login").post(userController_1.loginUser);
router.route("/register").post(userController_1.registerUser);
router.route("/logout").post(userController_1.logoutUser);
router.route("/refresh").post(userController_1.refreshUser);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const postController_1 = require("../controllers/postController");
router.route("/").get(postController_1.getAllPosts).post(postController_1.createPost);
router.route("/:id").put(postController_1.updatePost).delete(postController_1.deletePost);
exports.default = router;

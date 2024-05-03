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
exports.deletePost = exports.updatePost = exports.createPost = exports.getAllPosts = void 0;
const db_1 = require("../config/db");
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield db_1.prisma.post.findMany({
        where: { published: true },
        include: { author: true },
    });
    res.status(200).json(posts);
});
exports.getAllPosts = getAllPosts;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, email } = req.body;
    const post = yield db_1.prisma.post.create({
        data: {
            content,
            author: { connect: { email } },
        },
    });
    res.status(200).json(post);
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, content, published } = req.body;
    const updatedPost = yield db_1.prisma.post.update({
        where: { id: Number(id) },
        data: {
            published,
            content,
        },
    });
    res.status(200).json(updatedPost);
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const deletedPost = yield db_1.prisma.post.delete({
        where: { id: Number(id) },
    });
    res.status(200).json(deletedPost);
});
exports.deletePost = deletePost;

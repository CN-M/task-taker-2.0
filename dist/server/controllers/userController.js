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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getOneUser = exports.getAllUsers = void 0;
const db_1 = require("../config/db");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.prisma.user.findMany();
    res.status(200).json(users);
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield db_1.prisma.user.findMany({
        where: { id: Number(id) },
    });
    res.status(200).json(user);
});
exports.getOneUser = getOneUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    const user = yield db_1.prisma.user.create({
        data: {
            email,
            name,
        },
    });
    res.status(200).json(user);
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email, name } = req.body;
    const updatedUser = yield db_1.prisma.user.update({
        where: { id: Number(id) },
        data: {
            email,
            name,
        },
    });
    res.status(200).json(updatedUser);
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const deletedUser = yield db_1.prisma.user.delete({
        where: { id: Number(id) },
    });
    res.status(200).json(deletedUser);
});
exports.deleteUser = deleteUser;

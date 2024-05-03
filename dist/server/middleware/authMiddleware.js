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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
require("dotenv").config();
const { SECRET } = process.env;
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const { id } = jsonwebtoken_1.default.verify(token, SECRET);
            const user = yield db_1.prisma.user.findFirst({
                where: { id },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    password: false,
                },
            });
            if (!user) {
                return res.status(400).json({ error: "User not found" });
            }
            req.user = user;
            next();
        }
        catch (err) {
            console.error("Error:", err);
            return res.status(401).json({ error: "Not authorized" });
        }
    }
    if (!token) {
        const error = new Error("Not authorized, no token");
        res.status(401).send(error.message);
        console.error("Error:", error);
        return;
    }
});
exports.protect = protect;

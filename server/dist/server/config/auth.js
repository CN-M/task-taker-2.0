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
exports.authMiddleware = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
require("colors");
const passport_local_1 = require("passport-local");
const db_1 = require("./db");
exports.authMiddleware = new passport_local_1.Strategy((email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.prisma.user.findFirst({
            where: { email },
        });
        if (!user) {
            return done(null, false, { message: "Username not found!" });
        }
        if (!bcryptjs_1.default.compare(password, user.password)) {
            return done(null, false, { message: "Password Incorrect!" });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
}));
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await prisma.user.findFirst({ where: { id: Number(id) } });
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

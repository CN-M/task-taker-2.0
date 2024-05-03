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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
require("colors");
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("./config/auth");
dotenv_1.default.config();
const errorMiddleware_1 = require("./middleware/errorMiddleware");
// Import Routes
const db_1 = require("./config/db");
const taskRoute_1 = __importDefault(require("./routes/taskRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const { PORT, SECRET } = process.env;
const port = PORT || 8000;
const app = (0, express_1.default)();
app.set("views", __dirname);
app.set("view engine", "ejs");
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use((0, express_session_1.default)({ secret: SECRET || "cats", resave: false, saveUninitialized: true }));
app.use(passport_1.default.session());
app.use(express_1.default.urlencoded({ extended: false }));
passport_1.default.use(auth_1.authMiddleware);
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.prisma.user.findFirst({ where: { id: Number(id) } });
        done(null, user);
    }
    catch (err) {
        done(err);
    }
}));
app.use("/", taskRoute_1.default);
app.use("/users", userRoute_1.default);
app.get("/test", (req, res) => res.render("index", { user: req.user }));
app.get("/sign-up", (req, res) => res.render("sign-up-form"));
app.post("/sign-up", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield db_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        res.status(200).json(user);
    }
    catch (err) {
        return next(err);
    }
}));
app.post("/log-in", passport_1.default.authenticate("local", {
    successRedirect: "/test",
    failureRedirect: "/",
}));
app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});
// Error Middleware
app.use(errorMiddleware_1.catch404);
app.use(errorMiddleware_1.errorHandler);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`.cyan);
});

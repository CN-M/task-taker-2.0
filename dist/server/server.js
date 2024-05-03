"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
// import { authMiddleware } from "./config/auth";
dotenv_1.default.config();
const errorMiddleware_1 = require("./middleware/errorMiddleware");
// Import Routes
const taskRoute_1 = __importDefault(require("./routes/taskRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const { PORT, SECRET } = process.env;
const port = PORT || 8000;
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/account", userRoute_1.default);
app.use("/", taskRoute_1.default);
// Error Middleware
app.use(errorMiddleware_1.catch404);
app.use(errorMiddleware_1.errorHandler);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`.cyan);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const errorMiddleware_1 = require("./middleware/errorMiddleware");
// Import Routes
const taskRoute_1 = __importDefault(require("./routes/taskRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const { PORT, NODE_ENV, CLIENT_ROOT_URL } = process.env;
const port = PORT || 3000;
const node_env = NODE_ENV || "development";
const app = (0, express_1.default)();
app.set("trust proxy", 1);
const allowedOrigins = [CLIENT_ROOT_URL, "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:4173"];
// Middleware
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/account", userRoute_1.default);
app.use("/tasks", taskRoute_1.default);
// Error Middleware
app.use(errorMiddleware_1.catch404);
app.use(errorMiddleware_1.errorHandler);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`.cyan);
});

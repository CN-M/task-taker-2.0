import "colors";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import session from "express-session";
import helmet from "helmet";
import passport from "passport";
// import { authMiddleware } from "./config/auth";

dotenv.config();

import { catch404, errorHandler } from "./middleware/errorMiddleware";

// Import Routes
import taskRoute from "./routes/taskRoute";
import userRoute from "./routes/userRoute";

const { PORT, SECRET } = process.env;
const port = PORT || 8000;

const app: Express = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(passport.initialize());
app.use(
  session({ secret: SECRET || "cats", resave: false, saveUninitialized: true })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/account", userRoute);
app.use("/", taskRoute);

// Error Middleware
app.use(catch404);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`.cyan);
});

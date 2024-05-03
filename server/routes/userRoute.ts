import express from "express";

const router = express.Router();

import {
  deleteUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

router.route("/").put(protect, updateUser).delete(protect, deleteUser);
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

export default router;

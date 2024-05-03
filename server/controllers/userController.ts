import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db";

require("dotenv").config();

const { SECRET } = process.env;

const generateToken = (id: number) => {
  return jwt.sign({ id }, SECRET!, { expiresIn: "5d" });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const userExists = await prisma.user.findFirst({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    if (newUser) {
      const { id, firstName, lastName, email } = newUser;

      const token = generateToken(id);

      return res.status(201).json({
        id,
        firstName,
        lastName,
        email,
        token,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password!);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const { id, firstName, lastName, email: userEmail } = user;
    const token = generateToken(id);

    return res.status(201).json({
      id,
      firstName,
      lastName,
      email: userEmail,
      token,
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// export const getAllUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await prisma.user.findMany();

//     res.status(200).json(users);
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getOneUser = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const user = await prisma.user.findFirst({
//       where: { id: Number(id) },
//     });

//     res.status(200).json(user);
//   } catch (err) {
//     console.error("Error fetching user data:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName } = req.body;

    if (!req.user) {
      return res
        .status(400)
        .json({ error: "Not authoriized, please login or register" });
    }

    const { id: userId } = req.user;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
      },
      select: { firstName: true, lastName: true, email: true },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ error: "Not authoriized, please login or register" });
  }

  const { id: userId } = req.user;

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
      select: { firstName: true, lastName: true, email: true },
    });

    res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

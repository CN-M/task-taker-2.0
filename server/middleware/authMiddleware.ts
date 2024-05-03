import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../config/db";

require("dotenv").config();

const { SECRET } = process.env;

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      //   password: string | null;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const { id } = jwt.verify(token, SECRET!) as JwtPayload;

      const user = await prisma.user.findFirst({
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
    } catch (err) {
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
};

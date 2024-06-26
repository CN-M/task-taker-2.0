import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email addres" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});

export const taskSchema = z.object({
  task: z.string().min(1, { message: "Task is required" }),
});

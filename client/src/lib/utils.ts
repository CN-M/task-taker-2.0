import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from "../types";

const { VITE_ENV, VITE_BACKEND_URL } = import.meta.env;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkAndDeleteExpiredItem = (key: string, maxAge: number) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return;

  const user: User = JSON.parse(itemStr);

  const currentTime = new Date().getTime();

  // If the item is older than maxAge (in milliseconds), delete it
  if (currentTime - user.timestamp > maxAge) {
    localStorage.removeItem(key);
  }
};

export const CrootURL =
  VITE_ENV === "production" ? VITE_BACKEND_URL : "http://localhost:5173";

export const rootURL =
  VITE_ENV === "development"
    ? "http://localhost:5173"
    : "https://task-taker-2-0-backend.vercel.app";

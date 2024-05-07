import axios from "axios";
import { create } from "zustand";
import { User } from "../types";

const user = JSON.parse(localStorage.getItem("user")!);

interface AuthState {
  isAuthenticated: boolean;
  isError: boolean;
  isLoading: boolean;
  user: User | null;
  errorMessage: string;
  login: (userData: { email: string; password: string }) => void;
  logout: () => void;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: user ? true : false,
  isError: false,
  isLoading: false,
  user: user ? user : null,
  errorMessage: "",
  login: async (userData: { email: string; password: string }) => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    try {
      const data: User = await login(userData);
      set({ isAuthenticated: true, user: data });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({
        isError: true,
        errorMessage: err.message || "An error occurred during login",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    try {
      const data: User = await register(userData);
      set({ isAuthenticated: true, user: data });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({
        isError: true,
        errorMessage: err.message || "An error occurred during registration",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    try {
      logout();
      set({ isAuthenticated: false, user: null });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({
        isError: true,
        errorMessage: err.message || "An error occurred during logout",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

const register = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    "http://localhost:3000/account/register",
    userData
  );

  if (response.data) {
    const { data } = response;
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } else {
    throw new Error("Registration failed");
  }
};

const login = async (userData: { email: string; password: string }) => {
  const response = await axios.post(
    "http://localhost:3000/account/login",
    userData
  );

  if (response.data) {
    const { data } = response;
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } else {
    throw new Error("Login failed");
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

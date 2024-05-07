import axios from "axios";
import { create } from "zustand";
import { User } from "../types";

const user = JSON.parse(localStorage.getItem("user")!);

interface AuthState {
  isAuthenticated: boolean;
  isError: boolean;
  user: User | null;
  login: (userData: { email: string; password: string }) => void;
  logout: () => void;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
}

// type StateState = {
//   user: User | null;
//   isError: boolean;
//   isSuccess: boolean;
//   isLoading: boolean;
//   message: string;
// };

// const initialState: StateState = {
//   user: user ? user : null,
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: "",
// };

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: user ? true : false,
  user: user ? user : null,
  isError: false,
  login: async (userData: { email: string; password: string }) => {
    try {
      const data: User = await login(userData);
      set({ isAuthenticated: true, user: data });
    } catch (err) {
      set({ isError: true });
    }
  },

  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      const data: User = await register(userData);
      console.log("Registered user:", data);
      set({ isAuthenticated: true, user: data });
    } catch (err) {
      set({ isError: true });
    }
  },

  logout: () => {
    try {
      logout();
      set({ isAuthenticated: false, user: null });
    } catch (err) {
      set({ isError: true });
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
  }

  return response.data;
};

const login = async (userData: { email: string; password: string }) => {
  const response = await axios.post(
    "http://localhost:3000/account/login",
    userData
  );

  if (response.data) {
    const { data } = response;
    localStorage.setItem("user", JSON.stringify(data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

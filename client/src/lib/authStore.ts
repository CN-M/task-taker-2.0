import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  register: (userData: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (userData: User) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
  register: (userData: User) => {
    // Here you can perform your registration logic, like sending data to a backend API
    // For simplicity, we'll just log the user data to the console
    console.log("Registered user:", userData);
    // Assuming successful registration, log the user in
    set({ isAuthenticated: true, user: userData });
  },
}));

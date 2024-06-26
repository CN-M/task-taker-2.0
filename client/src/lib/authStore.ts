import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { User } from "../types";

const user = JSON.parse(localStorage.getItem("user")!);

interface AuthState {
  isAuthenticated: boolean;
  isGuest: boolean;
  isError: boolean;
  isLoading: boolean;
  user: User | null;
  errorMessage: string;
  login: (userData: { email: string; password: string }) => void;
  loginAsGuest: () => void;
  logout: () => void;
  logoutGuest: () => void;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: user ? true : false,
  isGuest: false,
  isError: false,
  isLoading: false,
  user: user ? user : null,
  errorMessage: "",
  // loginAsGuest: async (userData: { email: string; password: string }) => {
  loginAsGuest: async () => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    try {
      const guestUserData = {
        email: "batman@wayne.com",
        password: "SUPERMANSUCKS",
      };

      const data: User = await login(guestUserData);
      set({ isAuthenticated: true, user: data, isGuest: true });
      toast.success("Guest successfully logged in!");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { error } = err.response.data;

      set({
        isError: true,
        errorMessage:
          err.response.data.error || "An error occurred during login",
      });

      toast.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (userData: { email: string; password: string }) => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    try {
      const data: User = await login(userData);
      set({ isAuthenticated: true, user: data });
      toast.success("Successfully logged in!");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { error } = err.response.data;

      set({
        isError: true,
        errorMessage:
          err.response.data.error || "An error occurred during login",
      });

      toast.error(error);
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
      toast.success("User successfully registered!");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { error } = err.response.data;

      set({
        isError: true,
        errorMessage:
          err.response.data.error || "An error occurred during registration",
      });

      toast.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    try {
      await logout();
      set({ isAuthenticated: false, user: null });
      toast.success("Successfully logged out!");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { error } = err.response.data;

      set({
        isError: true,
        errorMessage: error || "An error occurred during logout",
      });

      toast.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  logoutGuest: async () => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    try {
      await logout();
      set({ isAuthenticated: false, user: null, isGuest: false });
      toast.success("Successfully logged out!");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { error } = err.response.data;

      set({
        isError: true,
        errorMessage: error || "An error occurred during logout",
      });

      toast.error(error);
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
    userData,
    { withCredentials: true }
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
    userData,
    { withCredentials: true }
  );

  if (response.data) {
    const { data } = response;

    localStorage.setItem(
      "user",
      JSON.stringify({ ...data, timestamp: new Date().getTime() })
    );
    return data;
  } else {
    throw new Error("Login failed");
  }
};

const logout = async () => {
  const response = await axios.post("http://localhost:3000/account/logout", {
    withCredentials: true,
  });

  if (response.data) {
    const { data } = response;
    localStorage.removeItem("user");
    return data;
  } else {
    throw new Error("Logout failed");
  }
};

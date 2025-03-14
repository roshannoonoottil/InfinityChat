import { create } from "zustand";
import { axiosInstance } from "../lib/axiox";
import toast from "react-hot-toast";
import axios from "axios";

// Define the type for the auth user
interface AuthUser {
  id: string;
  name: string;
  email: string;
  profilePic?: string;
}

// Define the type for the Zustand store
interface AuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: Record<string, any>) => Promise<void>;
  logout: () => Promise<void>;
  login: (data: Record<string, any>) => Promise<void>;
  updateProfile: (data: Record<string, any>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
        const res = await axiosInstance.get("/auth/check");
        console.log("✅ API Response:", res.data); // Debugging
        set({ authUser: res.data });
    } catch (error) {
        console.error("❌ Error in checkAuth:", error);
        set({ authUser: null });
    } finally {
        set({ isCheckingAuth: false });
    }  
  },

signup: async (data: Record<string, any>) => {
  set({ isSigningUp: true });
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    set({ authUser: res.data });
    console.log("✅ API Response:", res.data); // Debugging
    toast.success("Account created successfully");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  } finally {
    set({ isSigningUp: false });
  }
},


login : async (data: Record<string, any>) => {
  set({ isLoggingIn: true });
  try {
    const res = await axiosInstance.post("/auth/login", data);
    set({ authUser: res.data });
    toast.success("Logged in successfully")
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }finally {
    set({ isLoggingIn: false }); // ✅ Ensure loading stops
  }
},

logout: async (): Promise<void> => {
  try {
    await axiosInstance.post("/auth/logout");
    set({ authUser: null });
    toast.success("Logged out successfully");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }
},

updateProfile: async (data: Record<string, any>) =>{
  set({ isUpdatingProfile: true})
  try {
    const res = await axiosInstance.put("/auth/update-profile", data);
    set({ authUser: res.data });
    toast.success("Profile updated successfully");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
  } finally {
    set({ isUpdatingProfile: false })
  }
}

}));

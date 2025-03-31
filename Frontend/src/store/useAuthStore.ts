import { create } from "zustand";
import { axiosInstance } from "../lib/axiox";
import toast from "react-hot-toast";
import axios from "axios";
import { io, Socket } from "socket.io-client";

const BASE_URL = "https://infinitychat-od5i.onrender.com/api"
// const BASE_URL = "http://localhost:5000"




// Define the type for the auth user
interface AuthUser {
  _id: string;
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
  onlineUsers: string[];
  isCheckingAuth: boolean;
  socket: Socket | null; 
  checkAuth: () => Promise<void>;
  signup: (data: Record<string, any>) => Promise<void>;
  logout: () => Promise<void>;
  login: (data: Record<string, any>) => Promise<void>;
  updateProfile: (data: Record<string, any>) => Promise<void>;
  connectSocket: () => Promise<void>;
  disconnectSocket: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  onlineUsers: [],
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    try {
        const res = await axiosInstance.get("/auth/check");
        console.log("✅ API Response:", res.data); // Debugging
        set({ authUser: res.data });
        get().connectSocket()
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
    get().connectSocket()
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

      // 🔥 Wait before calling checkAuth (Give time for cookie to be available)
      setTimeout(() => {
        get().checkAuth(); // Now check authentication
      }, 500); // Small delay to allow cookie storage

    get().connectSocket()
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
    set({ authUser: null, onlineUsers: [] });
    toast.success("Logged out successfully");
    get().disconnectSocket()
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
},

connectSocket: async () => {
  const {authUser} = get();
  if (!authUser || get().socket?.connected) return;
  const socket = io(BASE_URL, {
    query: {
      userId: authUser._id,
    },
  })
  socket.connect()
  set({socket: socket})

  socket.on("getOnlineUsers",(users)=>{
    
    set({onlineUsers:users})
  })
},

disconnectSocket: async () => {
  if(get().socket?.connected) get().socket?.disconnect()
},


}));

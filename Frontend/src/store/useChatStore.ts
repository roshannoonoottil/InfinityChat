import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axiox";
import axios from "axios";

interface User {
  _id: string; // ✅ Changed 'id' to '_id'
  fullName: string; // ✅ Changed 'name' to 'fullName'
  profilePic?: string; // ✅ Added 'profilePic'
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

interface ChatState {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get<User[]>("/messages/user");
      set({ users: res.data });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to fetch users");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get<Message[]>(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to fetch messages");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser: (user: User | null) => set({ selectedUser: user }),

}));

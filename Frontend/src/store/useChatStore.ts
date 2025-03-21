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
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
  image?: string;
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
  sendMessage: (messageData: { text: string; image?: string | null }) => Promise<void>;
}



export const useChatStore = create<ChatState>((set,get) => ({
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


  sendMessage: async (messageData: { text: string }) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return Promise.resolve();
    try {
      const res = await axiosInstance.post<Message>(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to send message");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },
  

  setSelectedUser: (user: User | null) => set({ selectedUser: user }),

}));

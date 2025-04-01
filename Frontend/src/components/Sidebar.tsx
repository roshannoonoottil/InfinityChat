import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

// Define the User type based on your API response
interface User {
  _id: string;
  fullName: string;
  profilePic?: string;
}

// Sidebar Component
const Sidebar = () => {
  // Get users, selected user, and functions from Zustand store
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, messages } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // State for filtering online users
  const [showOnlineOnly, setShowOnlineOnly] = useState<boolean>(false);

  // Fetch users on component mount
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Filter users based on online status
  const filteredUsers: User[] = showOnlineOnly
    ? users.filter((user: User) => onlineUsers.includes(user._id))
    : users;

  // Function to get the last message for a user
  const getLastMessage = (userId: string) => {
    const userMessages = messages.filter(msg => msg.senderId === userId || msg.receiverId === userId);
    return userMessages.length > 0 ? userMessages[userMessages.length - 1].text : "No messages yet";
  };

  // Show loading skeleton while users are being fetched
  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-[#03624C]/30 flex flex-col transition-all duration-200 bg-[#030F0F]">
      {/* Header */}
      <div className="border-b border-[#03624C]/30 w-full p-5">
        <div className="flex items-center gap-2 text-[#00DF82]">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Users</span>
        </div>

        {/* Online Filter Toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 text-[#00DF82]/80">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm border-[#03624C] checked:bg-[#00DF82] checked:border-[#00DF82]"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-[#00DF82]/50">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user: User) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-[#03624C]/20 transition-colors
              ${selectedUser?._id === user._id ? "bg-[#03624C]/30 ring-1 ring-[#00DF82]/30" : ""}
            `}
          >
            {/* User Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/propic.jpg"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full border-2 border-[#03624C]/50"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-[#00DF82] 
                  rounded-full ring-2 ring-[#030F0F]"
                />
              )}
            </div>

            {/* User Info (Visible on larger screens) */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate text-white">{user.fullName}</div>
              <div className="text-sm text-[#00DF82]/70 truncate">
                {getLastMessage(user._id)}
              </div>
            </div>
          </button>
        ))}

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center text-[#00DF82]/50 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

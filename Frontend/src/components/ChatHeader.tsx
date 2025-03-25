import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

if(!selectedUser) return null;

  return (

<div className="p-2.5 border-b border-[#03624C]/30 bg-[#030F0F]">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="avatar">
        <div className="size-10 rounded-full relative border border-[#00DF82]/30">
          <img 
            src={selectedUser.profilePic || "/propic.jpg"} 
            alt={selectedUser.fullName} 
            className="object-cover"
          />
          {onlineUsers.includes(selectedUser._id) && (
            <span className="absolute bottom-0 right-0 size-2.5 bg-[#00DF82] rounded-full ring-1 ring-[#030F0F]"></span>
          )}
        </div>
      </div>

      {/* User info */}
      <div>
        <h3 className="font-medium text-white">{selectedUser.fullName}</h3>
        <p className="text-sm text-[#00DF82]/80">
          {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
        </p>
      </div>
    </div>

    {/* Close button */}
    <button 
      onClick={() => setSelectedUser(null)} 
      className="text-[#00DF82] hover:text-[#00DF82]/70 transition-colors"
    >
      <X className="size-5" />
    </button>
  </div>
</div>
  );
};
export default ChatHeader;

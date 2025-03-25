import { MessageSquare } from "lucide-react";

function NoChatSelected() {
  return (
<div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-[#030F0F]/50">
  <div className="max-w-md text-center space-y-6">
    {/* Icon Display */}
    <div className="flex justify-center gap-4 mb-4">
      <div className="relative">
        <div
          className="w-16 h-16 rounded-2xl bg-[#00DF82]/10 flex items-center
         justify-center animate-bounce border border-[#00DF82]/20"
        >
          <MessageSquare className="w-8 h-8 text-[#00DF82]" />
        </div>
      </div>
    </div>

    {/* Welcome Text */}
    <h2 className="text-2xl font-bold text-white">Welcome to InfinityChat!</h2>
    <p className="text-[#00DF82]/70">
      Select a conversation from the sidebar to start chatting
    </p>
  </div>
</div>
);
}

export default NoChatSelected

const MessageSkeleton = () => {
    // Create an array of 6 items for skeleton messages
    const skeletonMessages = Array(6).fill(null);
  
    return (
<div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#030F0F]">
  {skeletonMessages.map((_, idx) => (
    <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
      <div className="chat-image avatar">
        <div className="size-10 rounded-full border border-[#03624C]/30">
          <div className="skeleton w-full h-full rounded-full bg-[#03624C]/20" />
        </div>
      </div>

      <div className="chat-header mb-1">
        <div className="skeleton h-4 w-16 bg-[#03624C]/20 rounded" />
      </div>

      <div className="chat-bubble bg-transparent p-0">
        <div 
          className={`skeleton h-16 w-[200px] rounded-lg ${
            idx % 2 === 0 ? "bg-[#03624C]/20" : "bg-[#00DF82]/20"
          }`} 
        />
      </div>
    </div>
  ))}
</div>
    );
  };
  
  export default MessageSkeleton;
  
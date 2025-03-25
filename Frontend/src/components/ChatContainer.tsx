import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";


function ChatContainer() {
const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages} = useChatStore()
const { authUser } = useAuthStore();
const messageEndRef = useRef<HTMLDivElement | null>(null)

useEffect(()=>{
  if (selectedUser) { 
    getMessages(selectedUser._id);
    subscribeToMessages();
  }
  return(()=>{
    unsubscribeFromMessages();
  })
},[selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages])

useEffect(()=>{
  if (messageEndRef.current && messages) { 
    messageEndRef.current.scrollIntoView({ behavior: "smooth" }); 
  }
},[messages])

if(isMessagesLoading) {
  return (
    <div className="flex-1 flex flex-col overflow-auto">
    <ChatHeader />
    <MessageSkeleton />
    <MessageInput />
  </div>
  )
}

  return (
<div className="flex-1 flex flex-col overflow-auto bg-[#030F0F]">
  <ChatHeader />

  <div className="flex-1 flex flex-col overflow-auto p-4">
    {messages.map((message) => (
      <div 
        key={message._id}
        className={`chat ${message.senderId === authUser?._id ? 'chat-end' : 'chat-start'} mb-4`}
        ref={messageEndRef}
      >
        <div className="chat-image avatar">
          <div className="size-10 rounded-full border border-[#03624C]/50">
            <img 
              src={message.senderId === authUser?._id
                ? authUser.profilePic || "/propic.jpg"
                : selectedUser?.profilePic || "/propic.jpg"} 
              alt="profile pic"
            />
          </div>
        </div>
        <div className="chat-header mb-1 text-[#00DF82]/80">
          <time className="text-xs">
            {formatMessageTime(message.createdAt)}
          </time>
        </div>
        <div 
          className={`chat-bubble flex flex-col ${
            message.senderId === authUser?._id 
              ? 'bg-[#03624C] text-white' 
              : 'bg-[#03624C] text-white'
          }`}
        >
          {message.image && (
            <img
              src={message.image}
              alt="Attachment"
              className="sm:max-w-[200px] rounded-md mb-2"
            />
          )}
          {message.text && <p className="text-white">{message.text}</p>}
        </div>
      </div>
    ))}
  </div>

  <MessageInput />
</div>
  )
}

export default ChatContainer

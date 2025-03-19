import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";

function ChatContainer() {
const { messages, getMessages, isMessagesLoading, selectedUser} = useChatStore()

useEffect(()=>{
  if (selectedUser) { 
    getMessages(selectedUser._id);
  }
},[selectedUser, getMessages])

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
    <div className="flex-1 felx flex-col overflow-auto">
      <ChatHeader />

      <p>message...</p>

      <MessageInput />
    </div>
  )
}

export default ChatContainer

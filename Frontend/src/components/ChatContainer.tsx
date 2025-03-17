import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

function ChatContainer() {
const { messages, getMessages, isMessagesLoading, selectedUser} = useChatStore()

useEffect(()=>{
  getMessages(selectedUser._id)
},[selectedUser._id, getMessages])

if(isMessagesLoading) return <div>Loading...</div>;

  return (
    <div className="flex-1 felx flex-col overflow-auto">
      <ChatHeader />

      <p>message...</p>

      <MessageInput />
    </div>
  )
}

export default ChatContainer

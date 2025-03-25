import { useChatStore } from "../store/useChatStore"
import Sidebar from "../components/Sidebar"
import ChatContainer from "../components/ChatContainer"
import NoChatSelected from "../components/NoChatSelected"

function Home() {
  const { selectedUser } = useChatStore()
  return (
    <div className="h-screen bg-[#030F0F]">
  <div className="flex items-center justify-center pt-20 px-4">
    <div className="bg-[#030F0F]/90 border border-[#03624C]/30 rounded-lg shadow-[0_4px_30px_rgba(0,223,130,0.1)] w-full max-w-6xl h-[calc(100vh-8rem)]">
      <div className="flex h-full rounded-lg overflow-hidden">
        <Sidebar />
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  </div>
</div>
  )
}

export default Home

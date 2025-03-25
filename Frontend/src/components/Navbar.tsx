import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { LogOut, MessageSquare, User } from "lucide-react";


function Navbar() {
  const { logout, authUser} = useAuthStore()
  return (
<header className="bg-[#030F0F] border-b border-[#03624C]/50 fixed w-full top-0 z-40 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,223,130,0.1)]">
  <div className="container mx-auto px-5 h-16">
    <div className="flex items-center justify-between h-full">
      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-3 group transition-all duration-300">
          <div className="size-9 rounded-xl bg-gradient-to-br from-[#03624C] to-[#00DF82]/80 flex items-center justify-center border border-[#00DF82]/30 group-hover:shadow-[0_0_20px_-5px_rgba(0,223,130,0.5)] transition-all">
            <MessageSquare className="w-5 h-5 text-[#030F0F] stroke-[2.5]" />
          </div>
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00DF82] via-[#03624C] to-[#00DF82]">
            Infinity Chat
          </h1>
        </Link>
      </div>

      {authUser && (
        <div className="flex items-center gap-4">
          <Link 
            to="/profile" 
            className="relative overflow-hidden group px-4 py-2 rounded-lg border border-[#03624C] hover:border-[#00DF82] transition-all duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#03624C]/30 to-[#00DF82]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <div className="flex items-center gap-2 relative z-10">
              <User className="size-5 text-[#00DF82]" />
              <span className="text-white hidden sm:inline">Profile</span>
            </div>
          </Link>

          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-[#03624C] to-[#03624C]/80 hover:from-[#00DF82] hover:to-[#00DF82]/80 text-white transition-all duration-300 hover:shadow-[0_0_15px_-3px_rgba(0,223,130,0.5)]"
          >
            <LogOut className="size-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      )}
    </div>
  </div>
</header>
  )
}


export default Navbar
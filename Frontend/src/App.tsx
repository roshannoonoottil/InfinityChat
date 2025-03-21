import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import { lazy, useEffect } from "react"
import { useAuthStore } from "./store/useAuthStore";

const HomePage = lazy(()=> import('./pages/Home'));
const Signup = lazy(()=> import('./pages/Signup'));
const LoginPage = lazy(()=> import('./pages/Login'));
const SettingsPage = lazy(()=> import('./pages/Settings'));
const ProfilePage = lazy(()=> import('./pages/Profile'))
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log("onlineUsers",{onlineUsers});
  
  useEffect(() => {
    checkAuth(); // Call checkAuth when component mounts
  }, [checkAuth]);

  console.log("Auth User:", authUser); // ✅ Check if data is coming
  console.log("Checking Auth:", isCheckingAuth);
  if(isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  }
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser ? <Signup/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
      </Routes>

      <Toaster />
    </div>
  )
}

export default App

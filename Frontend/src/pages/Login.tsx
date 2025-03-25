import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";


function Login() {
  const [ showPassword, setShowPassword]  = useState(false);
  const [ formData, setFormData ] = useState({
    email: '',
    password: '' 
    });
    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      login(formData)
    }
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#030F0F]">
      {/* Left Side - Compact Form */}
      <div className="flex flex-col justify-center p-6 sm:p-8">
        <div className="w-full max-w-sm mx-auto space-y-6">
          {/* Logo Header */}
          <div className="text-center mb-6">
            <div className="flex flex-col items-center gap-2">
              <div className="size-10 rounded-lg bg-[#00DF82]/10 flex items-center justify-center border border-[#00DF82]/20">
                <MessageSquare className="size-4 text-[#00DF82]" />
              </div>
              <h1 className="text-xl font-semibold text-white mt-2">Welcome Back</h1>
              <p className="text-[#00DF82]/70 text-sm">Sign in to your account</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#00DF82]">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center">
                  <Mail className="size-3.5 text-[#03624C]" />
                </div>
                <input
                  type="email"
                  className="w-full pl-8 pr-3 py-2 text-sm bg-[#030F0F] border border-[#03624C]/50 rounded-md focus:border-[#00DF82] focus:ring-1 focus:ring-[#00DF82]/30 text-white placeholder-[#03624C]/70"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#00DF82]">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center">
                  <Lock className="size-3.5 text-[#03624C]" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-8 pr-8 py-2 text-sm bg-[#030F0F] border border-[#03624C]/50 rounded-md focus:border-[#00DF82] focus:ring-1 focus:ring-[#00DF82]/30 text-white placeholder-[#03624C]/70"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#03624C] hover:text-[#00DF82]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-3.5" />
                  ) : (
                    <Eye className="size-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-[#03624C] to-[#00DF82] hover:from-[#00DF82] hover:to-[#03624C] text-white text-sm font-medium rounded-md transition-all mt-4"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-1.5">
                  <Loader2 className="size-3.5 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-[#00DF82]/70 text-xs">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#00DF82] hover:underline font-medium">
              Create account
            </Link>
          </p>
        </div>
      </div>


{/* Right Side - Image/Pattern */}
<AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>

  )
}

export default Login

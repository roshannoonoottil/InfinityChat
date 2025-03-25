import { useState, ChangeEvent } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (!authUser) return <div className="text-center mt-20 text-xl">Loading...</div>;

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result as string;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
<div className="min-h-screen pt-20 bg-[#030F0F]">
  <div className="max-w-2xl mx-auto p-4 py-8">
    <div className="bg-[#14281D] rounded-xl p-6 space-y-8 border border-[#03624C]/30">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-[#00DF82]">Profile</h1>
        <p className="mt-2 text-[#FFFCDC]/80">Your profile information</p>
      </div>

      {/* Avatar Upload - Same structure, just colored */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <img
            src={selectedImg || authUser.profilePic || "/propic.jpg"}
            alt="Profile"
            className="size-32 rounded-full object-cover border-4 border-[#00DF82]"
          />
          <label
            htmlFor="avatar-upload"
            className={`absolute bottom-0 right-0 bg-[#03624C] hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
              isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
            }`}
          >
            <Camera className="w-5 h-5 text-[#FFFCDC]" />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
        <p className="text-sm text-[#FFFCDC]/70">
          {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
        </p>
      </div>

      {/* User Info - Same structure */}
      <div className="space-y-6">
        <div className="space-y-1.5">
          <div className="text-sm text-[#FFFCDC]/70 flex items-center gap-2">
            <User className="w-4 h-4 text-[#00DF82]" />
            Full Name
          </div>
          <p className="px-4 py-2.5 bg-[#030F0F] rounded-lg border border-[#03624C]/30 text-[#FFFCDC]">
            {(authUser as any)?.fullName}
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="text-sm text-[#FFFCDC]/70 flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#00DF82]" />
            Email Address
          </div>
          <p className="px-4 py-2.5 bg-[#030F0F] rounded-lg border border-[#03624C]/30 text-[#FFFCDC]">
            {authUser?.email}
          </p>
        </div>
      </div>

      {/* Account Info - Same structure with theme colors */}
      <div className="mt-6 bg-[#14281D] dark:bg-[#14281D] rounded-xl p-6 border border-[#03624C]/30">
        <h2 className="text-lg font-medium text-[#00DF82] mb-4">Account Information</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-[#03624C]/30">
            <span className="text-[#FFFCDC]/70">Member Since</span>
            <span className="text-[#FFFCDC]">{(authUser as any)?.createdAt?.split("T")[0]}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-[#FFFCDC]/70">Account Status</span>
            <span className="text-[#00DF82]">Active</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Profile;

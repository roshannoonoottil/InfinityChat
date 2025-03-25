import { FormEvent, useRef, useState } from "react"
import { useChatStore } from "../store/useChatStore"
import { Image, Send, X } from "lucide-react"
import toast from "react-hot-toast"

function MessageInput() {
  const [text, setText] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {sendMessage} = useChatStore()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
  
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      } else {
        setImagePreview(null);
      }
    };
  
    reader.readAsDataURL(file);
  };
  
  const removeImage = (): void => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>): Promise<void>  => {
    e.preventDefault()
    if(!text.trim() && !imagePreview) return;
    try {
      await sendMessage({
        text: text.trim(),
         image: imagePreview
        });
        setText("");
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Failed to send message", error);
    }
  }
  return (
<div className="p-4 w-full bg-[#030F0F] border-t border-[#03624C]/30">
  {imagePreview && (
    <div className="mb-3 flex items-center gap-2">
      <div className="relative">
        <img
          src={imagePreview}
          alt="Preview"
          className="w-20 h-20 object-cover rounded-lg border border-[#03624C]/50"
        />
        <button
          onClick={removeImage}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#030F0F] border border-[#03624C]/50
          flex items-center justify-center hover:bg-[#03624C]/30 transition-colors"
          type="button"
        >
          <X className="size-3 text-[#00DF82]" />
        </button>
      </div>
    </div>
  )}

  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
    <div className="flex-1 flex gap-2">
      <input
        type="text"
        className="w-full bg-[#030F0F] border border-[#03624C]/50 rounded-lg px-4 py-2 focus:border-[#00DF82] focus:ring-1 focus:ring-[#00DF82]/30 text-white placeholder-[#03624C]/70"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />

      <button
        type="button"
        className={`hidden sm:flex items-center justify-center size-10 rounded-full border ${imagePreview ? "border-[#00DF82] text-[#00DF82]" : "border-[#03624C]/50 text-[#03624C]"} hover:bg-[#03624C]/20 transition-colors`}
        onClick={() => fileInputRef.current?.click()}
      >
        <Image size={20} />
      </button>
    </div>
    <button
      type="submit"
      className={`flex items-center justify-center size-10 rounded-full bg-gradient-to-br from-[#03624C] to-[#00DF82] text-white hover:from-[#00DF82] hover:to-[#03624C] transition-all ${(!text.trim() && !imagePreview) ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={!text.trim() && !imagePreview}
    >
      <Send size={20} />
    </button>
  </form>
</div>
  )
}

export default MessageInput

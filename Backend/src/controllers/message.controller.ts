import { Request, Response } from 'express';
import User from '../models/user.model';
import Message from '../models/message.model';
import cloudinary from '../lib/cloudinary';
import { getReceiverSocketId, io } from '../lib/socket';

interface AuthenticatedRequest extends Request {
    user?: {
      _id: string;
    };
  }

export const getUserForSidebar = async (req: AuthenticatedRequest, res: Response) =>{
try {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized: No user found" });
        return;
      }

    const loggedUserId = req.user._id
    const filteredUsers = await User.find({_id:{$ne:loggedUserId}}).select("-password")

    res.status(200).json(filteredUsers)
} catch (error) {
    console.log("error in getUserForSidebar:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export const getMessages = async(req: AuthenticatedRequest, res: Response) =>{
try {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized: No user found" });
        return;
      }

    const { id: userToChatId } = req.params
    const myId = req.user._id
    const messages = await Message.find({
        $or:[
            {senderId : myId, receiverId : userToChatId},
            {senderId : userToChatId, receiverId : myId}
        ]
    })
    
    res.status(200).json(messages)
} catch (error) {
    console.log("error in getMessages controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const sendMessage = async (req: AuthenticatedRequest,res: Response) =>{
try {
    const {text, image} = req.body;
    const {id: receiverId} = req.params;
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized: No user found" });
        return;
      }

    const senderId = req.user._id;
    let imageUrl;

    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image : imageUrl
    })

    await newMessage.save()

    const receiverSocketId = getReceiverSocketId(receiverId)
    if(receiverSocketId){
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }
    
    res.status(200).json(newMessage)
} catch (error) {
    console.log("error in sendMessage controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
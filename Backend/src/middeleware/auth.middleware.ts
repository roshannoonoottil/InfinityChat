import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import { log } from "console";

interface AuthRequest extends Request {
    user?: any;
}


export const protectRoute = async (req : AuthRequest, res : Response, next : NextFunction): Promise<void> => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            console.log("token", token);
            
            res.status(401).json({message: "Unauthorized - No Token Provided"});
            return ;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

        if(!decoded || typeof decoded !== "object" || !decoded.userId){
            res.status(401).json({message: "Unauthorized - Invalid Token"})
            return ;
        }
        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            res.status(404).json({message: "User not found"})
            return ;
        }

        req.user = user
        next()
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return ;
    }
}
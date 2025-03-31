import jwt from "jsonwebtoken";
import { Response } from 'express';

export const generateToken = (userId : String, res : Response) =>{

  const secret = process.env.JWT_SECRET;

  if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
  }

    const token = jwt.sign({userId},secret as string,{expiresIn: '7d'})

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "none", // Fix cross-site cookie issues
        secure: true, // Always secure (since your site is HTTPS)
      });
    
      return token;
}
import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/utiles';


export const signup = async (req: Request, res: Response): Promise<void>=> {
    const {fullName, email, password} = req.body

    try {
        if (!fullName || !email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return ;
          }
      
        if(password.length < 6){
            res.status(400).json({message: 'Password must be at least 6 characters'});
            return ;
        }

        const user = await User.findOne({email})

        if (user){
            res.status(400).json({ message: "Email already exists" });
            return ;
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
          });
        
          if(newUser){
            generateToken(newUser._id.toString(),res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
              });
            } else {
                res.status(400).json({ message: "Invalid user data" });
            }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Error in signup controller", error.message);
            res.status(500).json({ message: error.message || "Internal Server Error" });
        } else {
            console.log("Unexpected error in signup controller", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email,password} = req.body
    try {
        const user = await User.findOne({email})

        if(!user) {
            res.status(400).json({message: "Invalid username or password"})
            return ;
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            res.status(400).json({message: "Invalid username or password"})
            return ;
        }
        
        generateToken(user._id.toString(), res)

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })


    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Error in login controller", error.message);
            res.status(500).json({ message: error.message || "Internal Server Error" });
        } else {
            console.log("Unexpected error in login controller", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

export const logout = (req: Request, res: Response): void => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    } catch(error: unknown) {
        if (error instanceof Error) {
            console.log("Error in logout controller:", error.message);
            res.status(500).json({ message: error.message || "Internal Server Error" });
        } else {
            console.log("Unexpected error in logout controller:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

export const updateProfile = async (req: Request, res: Response) => {

};

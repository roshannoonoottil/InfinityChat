import mongoose from "mongoose";

export const connetDB = async () => {
    try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
        throw new Error("MONGO_URL is not defined in environment variables.");
    }
     const con = await mongoose.connect(mongoUrl)
     console.log(`Mongodb Connected: ${con.connection.host}`);
     
        
    } catch (error) {
        
        console.log('MOngodb Connection Error:', error);
        
    }

}
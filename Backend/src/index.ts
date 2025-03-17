import express from 'express';
import authRoutes from './routes/auth.route'
import messageRoutes from './routes/message.route'
import dotenv from 'dotenv'
import { connetDB } from './lib/db';
import cookieParser from 'cookie-parser'
import cors from 'cors'


dotenv.config()

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // Allow cookies if needed
}));

app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connetDB()
});
 
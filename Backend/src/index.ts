
import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import authRoutes from './routes/auth.route'
import messageRoutes from './routes/message.route'
import { connetDB } from './lib/db';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app, server } from './lib/socket';



app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ limit: "3mb", extended: true }));

app.use(cookieParser())

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://infinity-chat-rho.vercel.app", // ✅ Deployed frontend
        "http://localhost:3000", // ✅ Local development frontend
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // ✅ Required for cookies/auth headers
  })
);

// ✅ Debug: Log incoming request headers (helps find missing tokens)
app.use((req, res, next) => {
  console.log("🔹 Incoming request headers:", req.headers);
  next();
});

// ✅ Manually set CORS headers (fixes Safari/iPhone issues)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://infinity-chat-rho.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Also, set Access-Control-Allow-Credentials explicitly
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://infinity-chat-rho.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "Server is running!" });
});

// Keep the server alive by pinging itself every 5 minutes
setInterval(() => {
  fetch("https://infinitychat-od5i.onrender.com/api/health").catch(() => {});
}, 300000); // 5 minutes (300,000 ms)



app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connetDB()
});
 
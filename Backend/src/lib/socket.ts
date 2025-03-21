import { Server } from "socket.io";
import http from "http";
import express from "express";


const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})

const userSocketMap: Record<string, string> = {};

io.on("connection",(socket) =>{
    console.log("a new client connected", socket.id);

    const userId = Array.isArray(socket.handshake.query.userId)
    ? socket.handshake.query.userId[0]
    : socket.handshake.query.userId; 

    console.log('userid-->',userId);
    
    
    if (userId) userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("a client disconnected", socket.id);
        if (userId && userSocketMap[userId]) { 
            delete userSocketMap[userId]; 
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    })

})

export {io, app, server};
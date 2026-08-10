import { Server } from "socket.io"


let io;
const userSocketMap = new Map()

export const initializeSocket = (server) => {

     io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    })
  

    io.on("connection", (socket) => {


        socket.on("addUser", (userId) => {
              if (!userId) {
              console.log("No userId received")
             return
           }

            socket.userId =userId
            userSocketMap.set(userId, socket.id)
            
            const onlineUsers = Array.from(userSocketMap.keys())
            io.emit("getOnlineUsers", onlineUsers)
            console.log("user connected:", socket.id)
            console.log(userSocketMap)
        })
         console.log("user connected:", socket.id)
         console.log(userSocketMap)

        socket.on("disconnect", () => {
            if(socket.userId){
                userSocketMap.delete(socket.userId)
                
            }
            console.log("user disconnected:", socket.id)
             const onlineUsers = Array.from(userSocketMap.keys())
            io.emit("getOnlineUsers", onlineUsers)
        })

    })

    return io

}

export const getSocketId = (userId) => {
    return userSocketMap.get(userId)
}

export const getIO = () => {
    return io
}
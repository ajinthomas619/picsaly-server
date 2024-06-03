import { Socket } from "socket.io";
import { io } from "../../app";

const userSocketMap: Record<string, string> = {};

export const getRecieverSocketId = (recieverId: string): string | undefined => {
  console.log("socket reciberrer",recieverId)
  return userSocketMap[recieverId];
};

console.log("the user socket mappp",userSocketMap)

const socketConfig = () => {
  try{
    console.log("enterd to socket config")
    io.on("connection", (socket: Socket) => {
      console.log("a user connected", socket.id);
  
      const userId: string | undefined = socket.handshake.query.userId as string;
      if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        console.log(`Mapped user ID ${userId} to socket ID ${socket.id}`);
      }
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
  
      socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id);
        if (userId) {
          delete userSocketMap[userId];
          console.log(`Removed user ID ${userId} from userSocketMap`);
          io.emit("getOnlineUsers", Object.keys(userSocketMap));
          console.log("Updated online users:", Object.keys(userSocketMap));

        }
      });
    });
  }catch(error){
    console.log("Error ===>" ,error)
  }
};
export default socketConfig;

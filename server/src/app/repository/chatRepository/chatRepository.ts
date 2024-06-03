import { Message } from "../../database/messageModel";
import { Conversation } from "../../database/conversationModel";
import { io } from "../../../app";
import { getRecieverSocketId } from "../../../utils/socket/socket";
import { response } from "express";
import { User } from "../../database/userModel";

export default {
  sendMessage: async (senderId: string, reciverId: string, message: string) => {
    try {
      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, reciverId] },
      });
 
      const reciverSocketId = getRecieverSocketId(reciverId);
      console.log("the reciver socket id",reciverSocketId)
      if (!conversation) {
        const newConversation = await Conversation.create({
          participants: [senderId, reciverId],
        });
        console.log("the new conversation",newConversation)
        const newMessage = new Message({
          senderId,
          reciverId,
          message,
        });
        if (newMessage) {
          newConversation.messages.push(newMessage._id);
          if (reciverSocketId) {
            io.to(reciverSocketId).emit("newMessages", newMessage);
          
          }
        }
        const [savedConversation, savedMessage] = await Promise.all([
          newConversation.save(),
          newMessage.save(),
        ]);
        if (savedConversation && savedMessage) {
          return {
            status: true,
            messsage: "message saved",
            response: { savedConversation, savedMessage },
          };
        } else {
          return { status: false, message: "message saved failed" };
        }
      } else {
        const newMessage = new Message({
          senderId,
          reciverId,
          message,
        });
        
        if (newMessage) {
          conversation.messages.push(newMessage._id);
          if (reciverSocketId) {
            io.to(reciverSocketId).emit("newMessages", newMessage);
            
          }
        }

        const savedMessage = await newMessage.save();
        console.log("the saved message",savedMessage)
        const savedConversation = await conversation.save();
        if (savedMessage) {
          return {
            status: true,
            message: "message saved",
            response: { savedMessage },
          };
        } else {
          return { status: false, message: "message saved failed" };
        }
      }
    } catch (error) {
      console.error("Error in sendMessage", error);
      return { status: false, message: "message save failed" };
    }
  },
  getMessages: async (senderId: string, reciverId: string) => {
    try {
  
      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, reciverId] },
      }).populate("messages");
  
      if (conversation) {
        return {
          status: true,
          message: "conversation found",
          conversation: conversation,
        };
      } else {
        return { status: false, message: "conversation not found" };
      }
    } catch (error) {
      console.log("error in finding conversation", error);
      return { status: false, message: "error in finding conversation" };
    }
  },
  getConversations: async (following: string[], userId: string) => {
    try {
      const conversations = await Conversation.find({
        $and: [{ participants: { $in: following } }, { participants: userId }],
      })
        .sort({ updatedAt: -1 })
        .populate({
          path: "participants",
          match: { _id: { $in: following } },
          select: "basicInformation.username  basicInformation.email profile.profileUrl",
        })
        .select("participants")
        .lean()      

      let participantsArray = conversations.flatMap((conversation) =>
        conversation.participants.map((participant:any) => ({
          _id: participant._id,
          username: participant.basicInformation?.username,
          profileUrl: participant.profile?.profileUrl,
        }))  
      );
      participantsArray = participantsArray.filter(
        (participant, index, self) =>
          index ===
          self.findIndex(
            (p) => p._id.toString() === participant._id.toString()
          )
      );
      const follow = await User.find({
        _id: { $in: following },
      })
      if (participantsArray.length !== follow.length) {
        const users = await User.find({
          _id: { $in: following },
        }).populate("socialConnections.Following");

        participantsArray = users.map((user) => ({
          _id: user._id,
          username: user.basicInformation?.username,
          profileUrl: user?.profile?.profileUrl,
        }));
      }

      if (conversations) {
        return {
          status: true,
          message: "conversations found",
          participantsArray,
        };
      } else {
        return { status: false, message: "error in finding conversations" };
      }
    } catch (error) {
      console.log("error in getConversations", error);
      return { status: false, message: "error in finding conversation" };
    }
  },
  addNewConversation:async(senderId:string,receiverId:string) => {
    try{
      let response:any
      const data = await Conversation.find({
        members:[senderId,receiverId]
      })
      if(!data.length){
        response = await Conversation.create({
          participants:[senderId,receiverId]
        })
      }
      if(data || response){
        return{
          status:true,
          message:"conversation created",
          data:data??response
        }
      }
      else{
        return {status:false,message:"error occured"}
        
      }
    }
    catch(error){
      console.log("error in adding new conversation",error)
      return {status:false,message:"error in adding coversation"}
    }
  },
  isConversationExists:async(senderId:string,receiverId:string) => {
    try {
      const response = await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
      })
      if(response){
        return {status:true,message:"Conversation Exists"}
      }
      else{
        return {status:false,message:"conversation does'nt exist"}
      }
    } catch (error) {
      console.log("error in conversaition",error)
      return {status:false,message:"error "}
    }
  }
};

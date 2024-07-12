import { Message } from "../../database/messageModel";
import { Conversation } from "../../database/conversationModel";
import { io } from "../../../app";
import { getRecieverSocketId } from "../../../utils/socket/socket";
import { response } from "express";
import { User } from "../../database/userModel";
import { GroupChat } from "../../database/groupModel";
import { GroupMessage } from "../../database/groupMessageModel";

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
          message
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
  },
  singleUserSendFile:async (data: any) => {
    try {
        console.log("the data is ", data);
        const { senderId, filename, receiverId } = data;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        console.log("the conversation isssd",conversation)
        const receiverSocketId = getRecieverSocketId(receiverId);

        if (!conversation) {
            const newConversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
            console.log("new conversation", newConversation);

            const newMessage = new Message({
                senderId,
                receiverId,
                message: "",
                imgURL:filename
            });

            newConversation.messages.push(newMessage._id);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessages", newMessage);
            }

            const [savedConversation, savedMessage] = await Promise.all([
                newConversation.save(),
                newMessage.save()
            ]);

            if (savedConversation && savedMessage) {
                return { status: true, message: "file sent successfully", data: { savedConversation, savedMessage } };
            } else {
                return { status: false, message: "file save failed" };
            }
        } else {
            const newMessage = new Message({
                senderId,
                receiverId,
                message: "",
                imgURL:filename
            });
            

            if (receiverSocketId) {
              io.to(receiverSocketId).emit("newMessages", newMessage);
            }
            
            const savedMessage = await newMessage.save();
            console.log("the savede message",savedMessage)
            conversation.messages.push(savedMessage._id);


            const savedConversation = await conversation.save();
            if (savedMessage && savedConversation) {
                return {
                    status: true,
                    message: "message saved",
                    data: { savedMessage }
                };
            } else {
                return {
                    status: false,
                    message: "message save failed"
                };
            }
        }
    } catch (error) {
        console.log("error in sending file", error);
       return { status: false, message: "file send failed" };
    }
},

  
  createNewGroup:async(data:any) => {
    const{title,description,membersData,admin,image,adminName} = data
    try {
      const updatedMembers = [...membersData,admin]
      const GroupExist = await GroupChat.findOne({name:title})
      if(GroupExist){
        return{status:false,message:"Group in this namalready exist"}
      }
      const Group = new GroupChat({
        name:title,
        description:description,
        profile:image,
        members:updatedMembers,
        admins:admin
      })
      const response = await GroupChat.create(Group)
console.log("the response for group chat",response)
      if(response) {
        io.to(response.id).emit(`GroupChat`,{
          group_id:response._id,
          sender_id:admin,
          content:`Group "${title}" created by ${adminName}`,
          type:"text",
          metadata:{},
          createdAt:new Date()
        })

        const groupMessage = new GroupMessage({
          group_id:response._id,
          sender_id:admin,
          content:`Group "${title}" created by ${adminName}`,
          metadata:{},
          createdAt:new Date()
        })

        await groupMessage.save()

        return{status:true,data:response}
      }
      else{
        return{status:false,message:"New Group creation failed"}
      }

    } catch (error) {
      console.log("error",error)
      return{status:false,message:`error:-${error}`}
    }
  },
  getAllGroupsOfUser:async(userId:any) => {
    try {
      const groupData = await GroupChat.find({
        members:{$all:[userId]}
      })
      if(groupData){
        return{status:true,data:groupData}
      }
      else{
        return{status:false,message:"Group Data not found"}
      }
    } catch (error) {
      console.log("error in getting groupsofusers",error)
      return{status:false,message:`error:-${error}`}
    }
  },
  deleteMessage:async(messageId:string) => {
    try {
      console.log("the message id for repos",messageId)
      const messages = await Message.findByIdAndDelete(messageId)
      if(messages){
        return {status:true,message:"message deleted"}
      }
      else{
        return{status:false,message:"no data found"}
      }
    } catch (error) {
      console.log("error in deleting messages",error)
      
    }
  },
  getGroupMessages:async(groupId:any) =>{
    try {
      const messages = await GroupMessage.find({group_id:groupId})
      if(messages){
        return{status:true,data:messages}
      }
      else{
        return{status:false,message:"no messages found"}
      }
    } catch (error) {
      console.log("error in getting group messages",error)
      return {status:false,message:`error:-${error}`}
    }
  },
  getGroupDataById:async(groupId:any) => {
    try {
      const response = await GroupChat.findById(groupId)
      if(response){
        return{status:true,data:response}
      }
      else{
        return {status:false,message:"No Data Found"}
      }
    } catch (error) {
      console.log("error in finding group data",error)
      return{status:false,message:`error:-${error}`}
    }
  },
  sendGroupMessage:async(data:any) => {
    const {group_id,sender_id,content,type,metadata} = data

    try {
      const groupData = await GroupChat.findById(group_id)
      if(!groupData){
        return{status:false,message:"No Group Data Found"}
      }
      const GroupMessageData = new GroupMessage({
        content,
        group_id,
        metadata,
        sender_id,
        type
      })

      const emitData = {
        group_id,
        sender_id,
        content,
        type,
        metadata
      }

      const response = await GroupMessageData.save()
      if(response){
        return{status:true,data:response}
      }
      else{
        return{status:false,message:"error while creating groupmessage"}
      }}
     catch (error) {
      console.log("error in sending gropupmessage",error)
      return{status:false,message:`error:-${error}`}
    }
  },
  videoCall:async(receiverId:string,senderId:string,roomId:string) =>{
    try {
      console.log("the reciever id",receiverId)
      const receiver = await User.findById(receiverId)
      const sender = await User.findById(senderId)


      
      console.log(JSON.stringify(receiver?._id))

      if(receiver){
        const receiverSocketId  = getRecieverSocketId(receiverId)
        console.log("treciver sockety",receiverSocketId)
        if(receiverSocketId){
          const callDetails = {sender,roomId}
          console.log("the call details",callDetails)
          io.to(receiverSocketId).emit("VideoCall",callDetails)
        } 
      }
      return {status:true,message:`Caling ${receiver?.basicInformation?.username}`}
    } catch (error) {
      console.log("error in viodeoCall",error)
      return{status:true,message:'error in calling'}
    }
  }
};

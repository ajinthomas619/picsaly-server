import { Notification } from "../../database/notificationModel";

export default{
    followNotification:async(message:any,data:any) => {
        try {
            const {sender_id,receiver_id,notificationType} = data
            console.log("the data for follow notification",data)
          console.log("th message is ",message)
            const alreadyExists = await Notification.exists({
             sender_id:data.sender_id,
             reciever_id:data.receiver_id,
             action_type:"follow"
            })

            
            if (message === "unfollowUserNotification") {
                const deleteResult = await Notification.deleteOne({
                    sender_id: data.sender_id,
                    receiver_id: data.receiver_id,
                    action_type: "follow",
                });
                console.log("the delete result",deleteResult)
                if (deleteResult.deletedCount > 0) {
                    console.log("Delete successful");
                    return { status: true, message: "Notification deleted successfully" };
                } else {
                    console.log("No notification found to delete");
                    return { status: false, message: "No notification found to delete" };
                }
            }
            if(alreadyExists){
                console.log("already exist")
                return{status:true}
            }
            const newNotification = new Notification({
                sender_id:sender_id,
                receiver_id:receiver_id,
                action_type:notificationType
            })
            const response = await newNotification.save()
            console.log("the response is ",response)
            if(response){
                return {status:true,data:response}
            }
            else{
                return{status:false,message:"Notification creation Failed"}
            }
        } catch (error) {
            console.log("error in creating follow notification",error)
            return {status:false,message:`error:-${error}`}
        }
    },
    likeNotification:async(message:any,data:any) => {
        try{
            console.log("the data is",data)
            const {sender_id,receiver_id,notificationType,postId,postImage} = data
            const alreadyExists = await Notification.exists({
                sender_id:data.sender_id,
                receiver_id:data.receiver_id,
                action_type:"like",
                "action_details.post_id":data.postId
            })
            if (message === "unlikePostNotification") {
                const deleteResult = await Notification.deleteOne({
                  sender_id: data.sender_id,
                  receiver_id: data.receiver_id,
                  action_type: "like",
                  "action_details.post_id": data.postId,
                });
                if (deleteResult.deletedCount > 0) {
                  console.log("Delete successful");
                  return { status: true, message: "Notification deleted successfully" };
                } else {
                  console.log("No notification found to delete");
                  return { status: false, message: "No notification found to delete" };
                }
              }
            if(alreadyExists){
                console.log("Already exist")
                return{status:true}
            }
            const newNotification = new Notification({
                sender_id:sender_id,
                receiver_id:receiver_id,
                action_type:notificationType,
                action_details:{
                    post_id:postId,
                    post_image:postImage
                }
            })
            const response = await newNotification.save()
            if(response){
                return{status:true,data:response}
            }
            else{
                return{status:false,message:"Notification creation failed"}
            }
        }
        catch(error){
            console.log("error in creating like notification",error)
            return{status:false,error:`error:-${error}`}
        }
    },
    commentNotification:async(data:any) => {
        try {
            const{sender_id,receiver_id,postId,postImage,comment,notificationType} = data

            const alreadyExists = await Notification.exists({
                sender_id:data.sender_id,
                receiver_id:data.receiver_id,
                action_type:"comment",
                "action_details.post_id":data.postId
            })
            if(alreadyExists){
                return{status:true}
            }

            const newNotification = new Notification({
                sender_id:sender_id,
                receiver_id:receiver_id,
                action_type:notificationType,
                action_details:{
                    post_id:postId,
                    post_image:postImage,
                    comment:comment
                }
            })
            const response = await newNotification.save()
            if(response){
                return {status:true,data:response}
            }
            else{
                return{status:false,message:"Erro creating comment notifaction"}
            }
        } catch (error) {
            console.log("erro in creating comment notification",error)
            return{status:false,message:`error:-${error}`}
        }
    },
    callNotification:async(data:any) => {
        try {
            const {sender_id,receiver_id,sender_name,notificationType} = data
            const newNotification = new Notification({
                sender_id:sender_id,
                receiver_id:receiver_id,
                action_type:notificationType,
                action_details:{
                    sender_name:sender_name
                }
            })
            const response =await newNotification.save()
            if(response){
                return {status:true,data:response}
            }
            else{
                return{status:false,message:"Notification creation failed"}
            }
        } catch (error) {
            console.error("error in creating call notifiaction",error)
            return{status:false,message:`error:-${error}`}
        }
    },
    messageNotification:async(data:any) => {
        try {
            const {sender_id,receiver_id,sender_name,messageType,notificationType} = data
            const newNotification = new Notification({
                sender_id:sender_id,
                receiver_id:receiver_id,
                action_type:notificationType,
                action_details:{
                    sender_name:sender_name,
                    message_type:messageType
                }
            })
            const response = await newNotification.save()
            if(response){
                return{status:true,data:response}
            }
            else{
                return{status:false,message:"Notification creation failed"}
            }
        } catch (error) {
            console.error("error in creating message notification",error)
            return{status:false,error:`error:-${error}`}
        }
    },
    getNotificationOfUser:async(userId:any) => {
        try {
            console.log("the user id",userId)
            const response = await Notification.find({receiver_id:userId}).sort({timestamp:-1})
            console.log("notificationnnnnnnnnnn",response)
            if(response){
                return{status:true,data:response}
            }
            else{
                return{status:false,message:"error in getting notification"}
            }
        } catch (error) {
            console.log("error in getting notification",error)
        }
    }

}
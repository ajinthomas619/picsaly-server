import mongoose,{Schema} from "mongoose";

const notificationSchema = new Schema({
    sender_id:{
        type:String,
    },
    receiver_id:{
  type:String
    },
    action_type:{
        type:String,
        enum:['follow','like','comment','call','chat_message']
    },
    action_details:{
        sender_name:String,
        post_id:{
            type:mongoose.Types.ObjectId,
            ref:'Post'
        },
        post_image:String,
        comment:String,
        message_type:{
            type:String,
            enum:['text','image','video','voice_note','file']
        }
    },
    timestamp:{
        type:Date,
        default:Date.now
    },
    read_status:{
        type:String,
        enum:['read','unread'],
        default:'unread'
    }

})

const Notification = mongoose.model('Notification',notificationSchema)

export {
    Notification
}
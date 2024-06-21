import mongoose from "mongoose";

const groupMessageSchema = new mongoose.Schema({
    group_id:{
        type:mongoose.Types.ObjectId,
        ref:'GroupChat',
        required:true
    },
    sender_id:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    content:{
        type:String
    },
    type:{
        type:String,
        enum:['text','image','video','voice_note','file'],
        required:true
    },
    metadata:{
        type:Object
    }
},{
    timestamps:true
})

const GroupMessage = mongoose.model('GroupMessage',groupMessageSchema)

export {
    GroupMessage
}
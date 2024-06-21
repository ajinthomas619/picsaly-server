import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    members:[
        {
            type:mongoose.Types.ObjectId,
            ref:'User'
        }
    ],
    description:{
        type:String
    },
    admins:[{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }],
    profile:{
        type:String
    }
})

const GroupChat = mongoose.model('GroupChat',groupSchema)

export {
    GroupChat
}



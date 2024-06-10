import mongoose from "mongoose";


const replySchema = new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    username:{
        type:String
    },
    name:{
        type:String
    },
    reply:{
        type:String
    }
},{timestamps:true})

const commentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    username:{
        type:String,
    },
    text:{
        type:String,
    },
    name:{
        type:String,
    },
    replies:[replySchema],
    likes:Array
},{timestamps:true})


const postSchema = new mongoose.Schema({
    caption:{
        type:String
    },
    image:[{
        type:String
    }],
    userId:{
     type:mongoose.Types.ObjectId,
     ref:'User'
    },
    Likes:[{
        userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
        },
        createdAt:{
            type:Date,
            default:Date.now
        },
        likescount:{
            type:Number
        }
    }],
    comments:[commentSchema],
    Tags:{
        type:[String]
    },
    location: {
        type:String,
    
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reportedUsersList:{
        type:Array,
    },
    Visibility:{
        type:Boolean,
        default:true
    }
}, {
    timestamps:true,
}

)
const Post= mongoose.model("Post",postSchema); 
export{ Post}
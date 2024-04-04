import mongoose from "mongoose";

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
    comments:[{
        userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
        },
        text:{
            type:String
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }],
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
        typr:Array,
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
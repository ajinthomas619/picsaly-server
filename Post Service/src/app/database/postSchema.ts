import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption:{
        type:String
    },
    image:{
        type:String
    },
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
        type:{
        type:String,
        default:"Point"
        },
        coordinates:{
            type:[Number],
        }
    }
}, {
    timestamps:true,
}

)
const Post= mongoose.model("Post",postSchema); 
export{ Post}
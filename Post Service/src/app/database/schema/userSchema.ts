import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id:{
        type: String, 
    },
    name:{
        type:String,
    },
    profile:{
        type:String,
    },
    email:{
        type:String,
    }
})

const User = mongoose.model("User",userSchema)
export {User}
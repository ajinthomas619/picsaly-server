import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
basicInformation:{
userId:String,
userName:String,
fullName:String,
email:String,
password:String,
phone:String,
dateofBirth:Date,
isGoogle: { type: Boolean, default: false } ,
isPremium: { type: Boolean, default: false },
isBlocked: { type: Boolean, default: false },
accountStatus:{
    type:String,
    enum:['login','logout','banned']
},
createdAt:{
    type:Date,
    default:Date.now()
}
},
profile:{
    profileUrl:String,
    Bio: String,
    status:{
        type:String,
        enum:['online','offline']
    }

},
socialConnections:{
    Following: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    Followers: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
  
},
activity:{
  posts:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post',
  },
  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post',
  }],
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post',
  }],
  saved:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post',
  }],
},
})

const User= mongoose.model("User",userSchema); 
export{ User}
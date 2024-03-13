import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
username:{
    type: String,
    
    
} ,
fullname:{
    type: String,
    
},
email:{
    type: String,
    required: true,
    

},
password: {
    type: String,
  
},
Bio: String,
Following: {type: Array,default: []},
Followers:{type: Array,default: []},
Saved: Array,
Profile_Picture:String,
mobile: {
    type:String,
},
isGoogle: { type: Boolean, default: false } ,
isPremium: { type: Boolean, default: false },
isBlocked: { type: Boolean, default: false },
created_at: Date,
updated_at: Date,
Tags: { type: Array, default: [] },

})

const User= mongoose.model("User",userSchema); 
export{ User}
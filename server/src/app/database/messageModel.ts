import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema({
    chatId: {
        type: mongoose.Types.ObjectId,
        ref:'User',
       
    },
    senderId: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true, 
    },
    message: {
        type: String,
         
    },
    imgURL: {
        type: String,
       
    },
    messageType:{
        type:String
    }
}, {
    timestamps: true, 
});


const Message = mongoose.model("Message", messageSchema);


export { Message };

import { Request,Response } from "express";

export default (dependencies:any) => {
    const{
        useCase:{Conversation_Usecase}
    } = dependencies

    const ConversationController = async(req:Request,res:Response) => {
       

        const {senderId,receiverId} = req.body
        const response = await Conversation_Usecase(dependencies).executeFunction(senderId,receiverId)
        if(response){
            res.json({status:response.status,message:response.message})
        }
        else{
            res.json({status:response.status,message:response.message})
        }
    }
    return ConversationController
}

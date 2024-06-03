import { Request,Response } from "express";

export default(dependencies:any) => {
    const {
        useCase:{getMessagesUsecase}
    } = dependencies
    const getMessageController = async(req:Request,res:Response) => {
        try {0
            const reciverId = req.params.userId
            const {senderId} = req.body
           

            const conversation = await getMessagesUsecase(
                dependencies
            ).executeFunction(senderId,reciverId) 
            if(conversation.status){
                res.status(200).json({status:true,message:conversation.message,conversation:conversation.conversation})
            }
            else{
                return res.status(400).json({status:false,message:conversation.message})
            }
        } catch (error) {
            console.log("error in get message controller",error)
            res.status(500).json("Conversation not found")
            
        }
    }
    return getMessageController
}
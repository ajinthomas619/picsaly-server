import { Request,Response } from "express";
import dependencies from "../../../config/dependencies";
import { responseEncoding } from "axios";

export default (dependencies:any) => {
    const {
        useCase:{sendMessageUsecase}
    } = dependencies

    const sendMessageController = async(req:Request,res:Response) => {
        try {
            
            const reciverId = req.params.userId
            const {senderId,message} = req.body
            

            const response = await sendMessageUsecase(dependencies).executeFunction(senderId,reciverId,message)
            
            if(response.status){
                res.status(200).json({
                    status:true,
                    message:"message sent successfully",
                    data:response.savedMessage
                })
            }
        } catch (error) {
            console.log("error in send message controller",error)
            res.status(500).json({status:false,message:"message nnot sent successfully"})
        }
    }
    return sendMessageController
}
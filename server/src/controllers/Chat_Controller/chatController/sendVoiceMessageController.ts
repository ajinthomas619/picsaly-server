import { Request,Response } from "express";

export default (dependencies:any) => {
    const {
        useCase:{sendGroupMessageUsecase}
    } = dependencies

    const sendVoiceMessageController = async(req:Request,res:Response) => {
        try {
            const audio = req.file?.filename
            console.log("the audio is",audio)

            const {group_id,sender_id,type,metadata} = req.body

            const data = {
                group_id,
                sender_id,
                content:audio,
                type,
                metadata
            }
            const response = await sendGroupMessageUsecase(dependencies).executeFunction(data)
            if(response.status){
                res.json({status:response.status,data:response.data})
            }
            else{
                res.json({status:response.status,message:response.message})
            }}
         catch (error) {
            console.log("error in send voice message controller",error)
        }
    }
    return sendVoiceMessageController
}
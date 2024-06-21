import { Request,Response } from "express";

export default (dependencies:any) => {
    const {
        useCase:{sendGroupMessageUsecase}
    } =dependencies

    const sendFileController = async(req:Request,res:Response) => {
        try {
            const file = req.file?.filename
            const {group_id,sender_id,type,metadata} = req.body
            const data = {
                group_id,
                sender_id,
                content:file,
                type,
                metadata
            }
            const response = await sendGroupMessageUsecase(dependencies).executeFunction(data)
            if(response.status){
                res.json({status:response.status,data:response.data})
            }
            else{
                res.json({status:response.status,message:response.message})
            }
        } catch (error) {
            console.log("error in send file controller",error)
        }
    }
    return sendFileController
}
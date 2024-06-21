import {Request,Response} from "express"


export default (dependencies:any) => {
    console.log("entered to single user file send controller")
    const {
        useCase:{singleUserFileSendUsecase}
    } = dependencies

    const singleUserSendFileController = async(req:Request,res:Response) => {
        console.log("the body is",req.body)
        console.log("the file",req.file)
        console.log("the params",req.params)

        const {senderId} = req.body
        const receiverId = req.params.userId

        const data = {
         
            senderId,
            filename:req.file?.filename,
            receiverId
        }

        console.log("the data for sending file",data)

        const response = await singleUserFileSendUsecase(dependencies).executeFunction(data)
        if(response.status){
            res.json({status:true,data:response.data})
        }
        else{
            res.json({status:response.status,message:response.message})
        }
    }
    return singleUserSendFileController
}
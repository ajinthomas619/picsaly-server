import {Request,Response} from 'express'

export default (dependencies:any) => {
    const{
        useCase:{videoCallUsecase}
    } =dependencies

    const videoCallController = async(req:Request,res:Response) => {
        try {
            console.log("entered to vide call controller")
            const {senderId,roomId} = req.body
            const {receiverId} = req.params
            const response = await videoCallUsecase(dependencies).executeFunction(
                receiverId,
                senderId,
                roomId
            )
            if(response.status){
                res.json({response})
            }
        } catch (error) {
            console.log("error in video call",error)
            res.json({status:false,message:"error in send video call"})
        }
    }
    return videoCallController
}
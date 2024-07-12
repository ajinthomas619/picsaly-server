import { Request,Response } from "express";


export default (dependencies:any) => {
    const {
        useCase:{clearNotificationUsecase}
    } = dependencies

    const clearNotificationController = async(req:Request,res:Response) => {
        try {
            const {userId} = req.params
            const response = await clearNotificationUsecase(dependencies).executeFunction(userId)
            if(response.status){
                res.json({status:response.status,message:response.message})
            }
            else{
                res.json({status:false,message:response.message})   
            }
        } catch (error) {
            console.log("error in clearnotification controller",error)
        }
    }
    return clearNotificationController
}
import { Request,Response } from "express";

export default (dependencies:any) => {
    const {
        useCase:{getNotificationOfUserUsecase} 
    } =dependencies

    const getNotificatioOfUserController = async(req:Request,res:Response) => {
      try {
        
        const {userId} = req.params
        const response = await getNotificationOfUserUsecase(dependencies).executeFunction(userId)
       
        if(response.status){
            res.json({status:response.status,data:response})
        }
        else{
            res.json({status:response.status,message:response.message})
        }
      } catch (error) {
        console.log("error in getnotification for user controller",error)
      }
    }
    return getNotificatioOfUserController
}
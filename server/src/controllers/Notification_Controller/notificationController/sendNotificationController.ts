import {Request,Response, json} from 'express'
import dependencies from '../../../config/dependencies'

export default (dependencies:any) => {
    const {likeNotificationUsecase,commentNotificationUsecase,followNotificationUsecase,messageNotificationUsecase} =  dependencies.useCase

   
      const handleEachMessage = async(message:any,data:any) => {
        console.log("the message",message)
       
        const messagedata = message
      


        if(messagedata === 'likePostNotification' || messagedata === 'unlikePostNotification'){
            const response = await likeNotificationUsecase(dependencies).executeFunction(message,data)
            if(response.status){
                console.log("success")
            }
            else{
                console.log("failed")
            }
        }
        else if(messagedata === 'commentPostNnotification' ){
            const response = await commentNotificationUsecase(dependencies).executeFunction(message,data)
            if(response.status){
                console.log("comment succennss")
            }
            else{
                console.log("error")
            }
        }
        else if(messagedata === 'followUserNotification' || messagedata === 'unfollowUserNotification') {
            const response = await followNotificationUsecase(dependencies).executeFunction(message,data)
            if(response.status){
                console.log("follow notification sucess")
            }
            else{
                console.log("foolow notification failed")
            }
        }
      }

      const sendNotificationController = async(req:Request,res:Response) => {
        console.log("the body,",req.body)
        const messages = req.body.message
        const data = req.body.data
        console.log("dataaaa",data)
         handleEachMessage(messages,data)
        res.status(200).send("notifiaction processed")
      }
      return sendNotificationController
    }

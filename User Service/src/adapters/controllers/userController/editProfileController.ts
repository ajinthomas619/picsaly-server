import { Request,Response } from "express";
import { decodeAccessToken } from "../../../utils/jwt/jwt";
import {authProducer} from "../../../events/authproducer"

export default (dedpendencies:any) =>{
    
    const {useCase:{editUserUsecase}} = dedpendencies
   const EditProfileController = async(req:Request,res:Response) => {
  try{
    const {accessToken} = req.cookies
    let userData: any = await decodeAccessToken(accessToken)
    if(userData.status){
        const userId = userData?.data?.user?._id || userData?.data?.user?.response._id
        const response = await editUserUsecase(dedpendencies).executeFunction(req.body,userId)
        
        await authProducer(userData,"userTopic","updaetUser")
        if(response){
            res.json({status: response.status,message:response.message,user:response.user})
        }
        else{
            res.json({status:userData.status,message:userData.message})
        }
    }
  }catch(error){
    console.log("error in editprofilecontroiller",error)
  }
   }
  return EditProfileController 
}
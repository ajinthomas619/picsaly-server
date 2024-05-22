import { Request,Response } from "express";
import { decodeAccessToken } from "../../../utils/jwt/jwt";
import {authProducer} from "../../../events/authproducer"
import { userData } from "../../../utils/interfaces/userInterface";

export default (dedpendencies:any) =>{
    
    const {useCase:{editUserUsecase}} = dedpendencies
   const EditProfileController = async(req:Request,res:Response) => {
  try{
    console.log("entered to edit profile controller");
    
 
    let data:userData = req.file?{...req.body,[req.file.fieldname]:req.file}
                        :{...req.body}
   console.log("the data for edit from frontend",data)
   
        const response = await editUserUsecase(dedpendencies).executeFunction(data)
        
        await authProducer(data,"userTopic","updateUser")
        if(response){
            res.json({status: response.status,message:response.message,user:response.user})
        }
        else{
            res.json({status:false,message:"somethingg error happened"})
        }
    
  }catch(error){
    console.log("error in editprofilecontroiller",error)
  }
   }
  return EditProfileController 
}
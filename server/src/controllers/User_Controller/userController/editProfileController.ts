import { Request,Response } from "express";
import { decodeAccessToken } from "../../../utils/jwt/jwt";

import { Userdata } from "../../../utils/interface/interface";

export default (dependencies:any) =>{
    
    const {useCase:{editUserUsecase}} = dependencies
   const EditProfileController = async(req:Request,res:Response) => {
  try{
    console.log("entered to edit profile controller");
    
   console.log("the data from frontend",req.body)
   const id = req.params.id
    let data = req.body
   console.log("the data for edit from frontend",)
   console.log("params idsdsdssss",id);
   
   
        const response = await editUserUsecase(dependencies).executeFunction(data,id)
        console.log("response of edit user usecase",response)
        
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
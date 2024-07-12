import { Request,Response } from "express";
import { decodeAccessToken } from "../../../utils/jwt/jwt";

export default (dependencies: any) => {
    const{
        useCase:{addProfileUsecase}
    } = dependencies

const addProfileController = async(req:Request,res:Response)=>{
try{
  
    const{accessToken} = req.cookies
    let userData:any = await decodeAccessToken(accessToken)
    

if(userData.status){
    const userId = userData?.data?.user?._id || userData?.data?.user?.response._id
    const response = await addProfileUsecase(dependencies).executeFunction(req.body,userId)
   
    if(response){
      
        const data={
            dateOfBirth:response.user.basicInformation.dateOfBirth,
            gender:response.user.basicInformation.gender,
            mobille:response.user.basicInformation.phone,
            userName:response.user.basicInformation.userName,
            bio:response.user.profile.bio
        }
        res.json({status:response.status,message:response.message,user:data})
    }
    else{
        res.json({status:userData.status,message:userData.message})
    }
 
}
     

}catch(error){
    console.log("error in addProfileController",error)
}
}
return  addProfileController;
}
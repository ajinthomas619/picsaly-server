import { Request,Response } from "express";

export default (dependencies:any) => {
    const {useCase:{getUserDataUsecase}} = dependencies

    const getUserDataController = async(req:Request,res:Response) => {
        try{
            const{email} = req.body
            console.log("bodyyy",req.body)
            const response = await getUserDataUsecase(dependencies)?.executeFunction(email)
            if(response){
                const data = {
                    _id:response.userData.basicInformation.userId,
                    email:response.userData.basicInformation.email,
                    name:response.userData.basicInformation.FullName,
                    DateOfBirth:response.userData.basicInformation.dateOfBirth,
                    isGoogle:response.userData.basicInformation.isGoogle,
                    gender:response.userData.basicInformation.gender,
                    userName:response.userData.basicInformation.userName,
                    profile:response.userData.basicInformation.profileUrl,
                   bio:response.userData.profile.bio
                }
                res.json({status:response?.status,message:response?.message,user:data})
            }
            else{
                res.json({status:false,message:'response error'})
            }
        }
        catch(error){
            console.log("error in getuserdata controller",error)
        }
    }
 return getUserDataController   
}
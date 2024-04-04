import { Request,Response } from "express";
import { decodeAccessToken } from "../../../utils/jwt/jwt";

export default (dependencies:any) => {
    const {useCase:{addProfileImageUsecase}}  = dependencies;
    const AddProfileImageController = async(req:Request,res:Response) => {
        try{
            const {accessToken} = req?.cookies
            let userData:any = await decodeAccessToken(accessToken)
            if(userData.status){
                const userId = userData?.data?.user?._id || userData?.data?.user?.response._id
                const imageUrl = req?.file?.filename
                const response = await addProfileImageUsecase(dependencies).executeFunction(imageUrl,userId)
                if(response){
                    res.json({status:response.status,message:response.message,data:response?.data})
                }
                else{
                    res.json({status:userData.status,message:userData.message})
                }
            }
        }
        catch(error){
            console.log("error in AddProfileImageController",error)
        }
    }
    return AddProfileImageController
}
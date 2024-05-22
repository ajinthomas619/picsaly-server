import { Request,Response } from "express";
import dependencies from "../../../config/dependencies";

export default(dependencies:any) => {
    const {useCase:{followUser_Usecase}} =dependencies

    const followUserController = async(req:Request,res:Response) => {
        console.log("entered to follow user controller")
        const{currentUserId,followedUserid} = req.body
        console.log(currentUserId,followedUserid,"rwe idssssssssssssssss")
        const response = await followUser_Usecase(dependencies).executeFunction(currentUserId,followedUserid);
        console.log("the adequate response",response)
        if(response.status){
            res.status(200).json({status:true,message:response.message})
        }
        else{
            res.status(400).json({status:false,message:"something error happened"})
        }
    }
    return followUserController
}
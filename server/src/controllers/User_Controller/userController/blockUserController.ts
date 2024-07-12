import { Request,Response } from "express";
import dependencies from "../../../config/dependencies";
export default (dependencies:any) => {
    const{useCase:{BlockUser_Usecase}} = dependencies

    const blockUserController = async(req:Request,res:Response)=>{
        
           
            const userId = req.body.userId
            const blockeduserid = req.body.blockUserId
            
            const response = await BlockUser_Usecase(dependencies).executeFunction(userId,blockeduserid); 
            if(response.status){
                res.status(200).json({status:true,message:response.message});
            }
            else{
                res.status(400).json({status:false,message:"error in blockuser controller"})
            }
        
    }
    return blockUserController
}
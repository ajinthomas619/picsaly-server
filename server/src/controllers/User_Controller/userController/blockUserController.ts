import { Request,Response } from "express";
import dependencies from "../../../config/dependencies";
export default (dependencies:any) => {
    const{useCase:{BlockUser_Usecase}} = dependencies

    const blockUserController = async(req:Request,res:Response)=>{
        
            console.log("entered to block user controller");
            const userId = req.body.userid
            const blockeduserid = req.body.userId
            
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
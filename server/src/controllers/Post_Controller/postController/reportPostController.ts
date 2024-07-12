import { Request,Response } from "express";
import dependencies from "../../../config/dependencies";

export default (dependencies:any) => {
    const {
        useCase:{reportPostUsecase}
    } = dependencies

    const reportPostController = async(req:Request,res:Response) => {
        try{
            const reportObject = req.body.reason
            const userId = req.body.userId
            const {postId} = req.params
          

            const response = await reportPostUsecase(dependencies).executeFunction(
                postId,
                userId,
                reportObject,
            )
           
            if(response.status){
                res.status(200).json({status:true,message:response.message})
            }
            else{
                res.status(400).json({status:false,message:response.message})
            }
        }
        catch(error){
            console.log("error in report post controller",error)
            res.status(500).json({status:false,message:"internal server error"})
        }
    }
    return reportPostController
}
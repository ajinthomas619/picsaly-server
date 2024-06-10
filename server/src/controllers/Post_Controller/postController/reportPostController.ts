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
            console.log("the body for reporting post",req.body)
            console.log("the userrrrrt",userId)
            console.log("the report object",reportObject)

            const response = await reportPostUsecase(dependencies).executeFunction(
                postId,
                userId,
                reportObject,
            )
            console.log("the response forf report",response)
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
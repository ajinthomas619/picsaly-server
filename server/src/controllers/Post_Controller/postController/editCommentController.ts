import { Request,Response } from "express";
import dependencies from "../../../config/dependencies";

export default(dependencies:any) => {
    const {
        useCase:{editComment_useCase}
    } =dependencies
    const editCommentController = async(req:Request,res:Response)=>{
        try {
            const {postId} = req.params
            const commentData = req.body

            const response = await editComment_useCase(dependencies).executeFunction(
                postId,
                commentData
            )
            if(response.status){
                res.status(200).json({status:true,message:response.message})
            }
            else{
                res.status(400).json({status:false,message:response.message})
            }
            
        } catch(error) {
            console.log("error in edit comment controller",error)
            res.status(500).json({status:false,message:"error in editing comment"})
        }
    }
    return editCommentController
}
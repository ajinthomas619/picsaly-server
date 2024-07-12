import { Request,Response } from "express";

export default (dependencies:any) => {
    const {
        useCase:{updatePostStatusUsecase}
    } = dependencies

    const updatePostStatusController = async(req:Request,res:Response) => {
        try {
            
            const {postId} = req.body

            const response = await updatePostStatusUsecase(dependencies).executeFunction(postId)
            if(response.status){
                res.status(200).json({status:true,message:response.message,data:response.post})
            }
            else{
                res.status(400).json({status:false,message:response.message})
            }
        } catch (error) {
            console.log("Error in update post status controller")
            res.status(500).json({status:false,message:"internal server error"})
        }
    }
    return updatePostStatusController
}
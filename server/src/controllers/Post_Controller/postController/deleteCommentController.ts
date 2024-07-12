import {Request,Response } from "express"


export default (dependencies:any) => {
    const{
        useCase:{deleteComment_useCase}
    } = dependencies
const deleteCommentController = async(req:Request,res:Response) => {
    try{
       
        const postId = req.headers.postid
        const {commentId} = req.params
        
        const response = await deleteComment_useCase(dependencies).executeFunction(
            postId,
            commentId
        )
        if(response.status){
            res.status(200).json({status:true,message:response.message})
        }
        else{
            res.status(400).json({status:false,message:response.message})
        }
    }
    catch(error){
        console.log("error in deleteCommentController",error)
    }
}
return deleteCommentController

}
import {Request,Response } from "express"


export default (dependencies:any) => {
    const{
        useCase:{deleteComment_useCase}
    } = dependencies
const deleteCommentController = async(req:Request,res:Response) => {
    try{
        console.log(req.headers.postid)
        console.log("params",req.params)
        const postId = req.headers.postid
        const {commentId} = req.params
        console.log("post id",postId)
        console.log("comment id",commentId)
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
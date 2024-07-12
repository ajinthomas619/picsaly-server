import {Request,Response} from "express"
import dependencies from "../../../config/dependencies"

export default (dependencies:any) => {
    const {
        useCase:{likeComment_useCase}
    }=dependencies

    const likeCommentController = async(req:Request,res:Response) => {
        try {
            const {commentId} = req.params
            const {postId,userId,Liked} = req.body
            const response = await likeComment_useCase(dependencies).executeFunction(
                postId,
                userId,
                commentId,
                Liked
            )
             
            if(response.status){
                res.status(200).json({status:true,message:response.message})
            }
            else{
                console.log("the response messsage",response.message)
                res.status(400).json({status:false,message:response.message})
            }
        } catch (error) {
            console.log("error in like comment controller",error)
            res.status(500).json({status:false,message:"error in liking comment"})
            
        }
    }
    return likeCommentController
}
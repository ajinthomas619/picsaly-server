import {Request,Response} from "express"


export default(dependencies:any) =>{
    const {
        useCase:{replyToComment_useCase}
    } = dependencies
    const replyToCommentController = async(req:Request,res:Response) => {
        const commentId= req.params.commentId
        const commentData = req.body
        const postId = req.body.postId
        console.log("the post id",commentId)
        console.log("the comment data",commentData)
        console.log("body",req.body)
        try{
            const response = await replyToComment_useCase(dependencies).executeFunction(commentId,commentData,postId)
            if(response.status){
                res.status(200).json({
                    status:true,
                    message:response.message,
                    data:response.reply
                })
            }else{
                res.status(400).json({status:false,message:"failed to  replu to comment"})
            }
        }
        catch(error){
            console.log("error in replycomment controller",error)
            res.status(500).json({status:false,message:"internal server error"})
        }
    
    }
    return replyToCommentController
}
import {Request,Response} from "express"


export default(dependencies:any) =>{
    const {
        useCase:{replyToComment_useCase}
    } = dependencies
    const replyToCommentController = async(req:Request,res:Response) => {
        const postId= req.params.postId
        const commentData = {...req.body}
        try{
            const response = await replyToComment_useCase(dependencies).executeFunction(postId,commentData)
            if(response.status){
                res.status(200).json({
                    status:true,
                    message:response.message,
                    data:response.data
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
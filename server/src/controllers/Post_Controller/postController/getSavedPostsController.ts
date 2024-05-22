import {Request,Response} from"express"

export default(dependencies:any) => {
    const{
        useCase:{getSavedPost_useCase}
    } = dependencies

    const getSavedPostsController = async(req:Request,res:Response) => {
        try{
            const userid = req.params
            const response = await getSavedPost_useCase(dependencies).executeFunction(userid)
            if(response.status){
                res.status(200).json({status:true,message:response.message,posts:response.posts})
            }
            else{
                res.status(400).json({status:false,message:response.message})
            }
        }
        catch(error){
            console.log("error in getSavePostController",error)
            res.status(500).json({status:false,message:"error getting saved posts"})
        }
    }
    return getSavedPostsController
}
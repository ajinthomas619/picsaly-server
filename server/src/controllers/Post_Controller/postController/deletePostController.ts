import { Request,Response } from "express";
export default(dependencies:any) => {
    const{
        useCase:{deletePost_useCase}
    } = dependencies

    const deletePostController = async(req:Request,res:Response) => {
        try{
            const id = req.params.id
            console.log("dellete id",id)
            const response = await deletePost_useCase(dependencies).executeFunction(id)
            if(response.status){
                res.status(202).json({status:true,message:'post deleted successfully'})
            }
            else{
                res.status(500).json({status:false,message:"post deletion failed"})
            }
        }
        catch(error){
           console.log("error in delete post controller",error)
        }
    }
    return deletePostController
}
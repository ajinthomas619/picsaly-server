import { Request,Response } from "express";

export default (dependencies:any) => {

    
    const{
        useCase:{editPost_useCase}
    } = dependencies
    
    const editPostController = async(req:Request,res:Response) => {
    
    try{
            console.log("edit post controller stage 2");
            const id = req.params.id;
            const data = req.body;
              console.log("body edit",data);
              
            const response = await editPost_useCase(dependencies).executeFunction(id,data)
            console.log("response of edit post controllerr",response);
            
            if(response.status){
                res.status(200).json({statusP:true,message:"post updated successfully"})
            }
            else{
                res.status(500).json({status:false,message:"post updation failed"})
            }
        }
        catch(error){
            console.log("error in edit post controller",error)
            res.status(500).json({ status: false, message: "An error occurred while updating the post" });

        }
    }
    return editPostController
}
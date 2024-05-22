import { Request,Response } from "express";


export default(dependencies:any) => {
    
    const { useCase: { getAllPostOfUserUsecase } } = dependencies;

    const getAllPostOfUserController = async(req:Request,res:Response)=>{
        console.log("entered to getAllPostOfUser controller");
        try{
         const userId = req.query.id
         console.log("userid id for fetching post",userId);
         if(!userId){
            return res.status(400).json({status:false,message:"No UserId provided By the query"})
         }
         const response = await getAllPostOfUserUsecase(dependencies).executeFunction(userId)
         console.log("response of getAllPostOfUserController",response);
         if(response.status){
            return res.json({status:true,data:response.data})
         }
         else{
            return res.json({status:false,message:response.message})
         }

         
        }
        catch(error){
            console.error("Error  in getting all posts by user : ", error);
            return res.json({status:false,message:"internal server error"})
        }
    }
    return getAllPostOfUserController
}
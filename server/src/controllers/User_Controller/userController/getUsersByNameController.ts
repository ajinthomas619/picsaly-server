import { Request,Response } from "express";

export default (dependencies:any) =>{
    const{
        dependencies:getUserByNameUsecase
    } = dependencies
    const getUserByNameController = async(req:Request,res:Response)=>{

      try{
        const name:string= req.body.name;
        const response = await getUserByNameUsecase(dependencies).executeFunction(name)
      if(response.status){
        res.status(200).json({status:true,data:response.data})
      }  
      else{
        res.status(200).json({status:false})
      }
    
    }catch(error){
        console.log("error in getuserbyname controller",error)
    }

    }
    return getUserByNameController
}
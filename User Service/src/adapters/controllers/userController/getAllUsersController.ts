import { Request,Response } from "express";

export default (dependencies:any) => {
    const{
        useCase:getAllUsersUsecase
    } = dependencies
    const getAllUsersController = async(req:Request,res:Response)=>{
        const response = await getAllUsersUsecase(dependencies).executeFunction()
        console.log("response of all users",response)
        if(response.status){
            res.status(200).json({status:true,data:response.data})
        }
        else{
            res.status(400).json({status:false})
        }
    }
    return getAllUsersController
}
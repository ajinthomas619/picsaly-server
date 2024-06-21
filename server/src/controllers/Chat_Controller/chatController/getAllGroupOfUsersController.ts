import { Request,Response } from "express";

export default (dependencies:any) => {
    const {useCase:{getAllGroupOfUsersUsecase}} = dependencies

    const getAllGroupOfUsersController = async(req:Request,res:Response) => {
        try{
        const userId = req?.query?.id
        const response = await getAllGroupOfUsersUsecase(dependencies).executeFunction(userId)
        if(response.status){
            res.json({status:response.status,message:response.message,data:response.data})
        }
        else{
            res.json({status:response.status,message:response.message})
        }}
    
    catch(error){
        console.log("error in get all group of users controller",error)
    }
    }
return getAllGroupOfUsersController
}
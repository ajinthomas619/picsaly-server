import { Request,Response } from "express";

export default (dependencies:any) => {
    const {
        useCase:getUserByIdUsecase
    } = dependencies
    const getUserByIdController = async(req:Request,res:Response) => {
        try{
            const id = req.body.id
            console.log("idd",id)
            const response = await getUserByIdUsecase(dependencies).executeFunction(id)
            console.log("resxponseee",response)
            if(response.status){
                res.status(200).json({status:true,data:response.data})
            }
            else{
                res.status(404).json({status:false});
            }
        }
        catch(error){
            console.log("error in getuserbuid controller",error)
        }
    }
    return getUserByIdController
}
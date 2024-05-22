import { Request,Response } from "express";

export default(dependencies:any) => {
    const{
        useCase:{getSearchUserUsecase}
    } = dependencies
    const getSearchUserController = async (req:Request,res:Response) => {
        const regex = req.params.user
        console.log("rteee",req.params.user)
        const response = await getSearchUserUsecase(dependencies).executeFunction(regex)
        if(response.status){
            res.status(200).json({status:true,message:response.message,data:response.data})
        }
        else{
            res.status(400).json({status:false})
        }
    }
    return getSearchUserController
}
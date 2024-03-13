import { Request,Response } from "express";

export default(dependencies:any) => {
    const{
        Usecase:getSearchUserUsecase
    } = dependencies
    const getSearchUserController = async (req:Request,res:Response) => {
        const {user} = req.params
        const response = await getSearchUserUsecase(dependencies).executeFunction
        if(response.status){
            res.status(200).json({status:true,data:response.data})
        }
        else{
            res.status(400).json({status:false})
        }
    }
    return getSearchUserController
}
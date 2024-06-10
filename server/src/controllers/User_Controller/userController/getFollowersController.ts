import { Request,Response } from "express";

export default(dependencies:any) => {
    const{
        useCase:{getFollowersUsecase}
    } = dependencies

    const getFollowersController = async(req:Request,res:Response) => {
        const userId = req.params.id
        const response = await getFollowersUsecase(dependencies).executeFunction(userId)
        if(response.status)  {
            res.status(200).json({status:true,message:response.message,data:response.data})
        }
       else{
        res.status(400).json({status:false,message:response.message})
       }
    }
    return getFollowersController
}
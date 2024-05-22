import { Request,Response } from "express";


export default(dependencies:any) => {
    const{
        useCase:{getSuggestedUser_useCase}
    } = dependencies
    const getSuggestedUsersController = async(req:Request,res:Response) => {
        const userId = req.params.id
        console.log("the user id",userId)
        const response = await getSuggestedUser_useCase(dependencies).executeFunction(userId)
        if(response.status){
            res.status(200).json({status:true,message:'suggested users',data:response.data})
        }
        else{
            res.status(400).json({status:false,message:'error'})
        }
    }
    return getSuggestedUsersController
}
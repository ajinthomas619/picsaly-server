import  {Request, Response} from 'express';
import dependencies from '../../../config/dependencies';


export  default (dependencies:any) => {
    const {useCase:{UnblockUser_Usecase}} = dependencies

    const unblockUserController = async(req:Request,res:Response) => {
        const userId = req.body.userId
        const unblockUserId = req.body
        const response = await UnblockUser_Usecase(dependencies).executeFunction(userId,unblockUserId)
        if(response.status){
            res.status(200).json({status:true,message:response.message})
        }
        else{
            res.status(400).json({status:false,message:"An error occurred in unblock controller"});
        }
    }
    return unblockUserController
}
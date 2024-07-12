import { Request,Response } from "express";

export default(dependencies:any) => {
    const showPostForHomeController = async(req:Request,res:Response) => {
        const {useCase :{showPostForHomeUsecase}} = dependencies

        const userId = req.params.id

        const response = await showPostForHomeUsecase(dependencies).executeFunction(userId)
        if(response.status){
            res.status(200).json({status:true,data:response.data})
        }
        else{
            res.status(400).json({status:false})
        }
    }
    return showPostForHomeController
}
import { Request,Response } from "express";

export default (dependencies:any) =>{
   const  showAllPostForAdminController = async(req:Request,res:Response) => {
        const {useCase:{showAllPostForAdminUsecase}} = dependencies
        const response = await showAllPostForAdminUsecase(dependencies).executeFunction()

        if(response.status){
            res.status(200).json({status:true,data:response.data})
        }
        else{
            res.status(400).json({status:false})
        }
    }
    return showAllPostForAdminController
}
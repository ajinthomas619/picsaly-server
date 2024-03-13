import { Request,Response } from "express";

export default (dependencies:any) => {
    const showAllPostController = async(req:Request,res:Response) => {
        const {useCase:showAllPostUseCase} = dependencies;
        const response = await showAllPostUseCase(dependencies).executeFunction
        if(response.status){
            res.status(200).json({status:true,data:response.data});
        }
        else{
            res.status(400).json({status:false})
        }
    }
    return showAllPostController
}
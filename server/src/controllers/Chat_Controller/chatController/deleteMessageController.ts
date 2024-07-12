import { Request,Response } from "express";

export default (dependencies:any) => {
    const{useCase:{deleteMessageUsecase}} = dependencies

    const deleteMessageController = async(req:Request,res:Response) => {
        try {
            const {id} = req.params
           
            const response = await deleteMessageUsecase(dependencies).executeFunction(id)
            if(response.status){
                res.json({status:response.status,message:response.message})
            }
            else{
                res.json({status:response.status,message:response.message})
            }
        } catch (error) {
            console.log("error in delete message controller",error)
        }
    }
    return deleteMessageController
}
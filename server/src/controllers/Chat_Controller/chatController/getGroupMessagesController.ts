import { Request,Response } from "express";

export default (dependencies:any) => {
    const{useCase:{getGroupMessagesUsecase}} = dependencies

    const getGroupMessagesController = async(req:Request,res:Response) => {
        try {
            const {groupId} = req.query

            const response = await getGroupMessagesUsecase(dependencies).executeFunction(groupId)
            if(response.status){
                res.json({status:response.status,message:response.message,data:response.data})
            }
            else{
                res.json({status:response.status,message:response.message})
            }}
         catch (error) {
            console.log("error in get group messages controller",error)
        }
    }
    return getGroupMessagesController
}
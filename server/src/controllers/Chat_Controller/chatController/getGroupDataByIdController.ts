import { Request,Response } from "express";

export default(dependencies:any) => {
    const {useCase:{getGroupDataByIdUsecase}} =dependencies
    const getGroupDataByIdController = async(req:Request,res:Response) => {
        try {
            const {groupId} = req.query
            const response = await getGroupDataByIdUsecase(dependencies).executeFunction(groupId)
            if(response.status){
                res.json({status:response.status,data:response.status})
            }
            else{
                res.json({status:response.status,message:response.message})
            }
        } catch (error) {
            console.log("error in get group data by id controller",error);
            
        }
    }
    return getGroupDataByIdController
}
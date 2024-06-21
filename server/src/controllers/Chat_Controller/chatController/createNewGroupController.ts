import { Request,Response } from "express";


export default (dependencies:any) => {
    const{useCase:{createNewGroupUsecase}} = dependencies

    const createNewGroupController = async(req:Request,res:Response) => {
        try {
            const {title,description,members,admin,adminName} = req.body
            const image = req?.file?.filename
            const membersData = JSON.parse(members)

            const data = {
                title,
                description,
                membersData,
                admin,
                image,
                adminName
            }
            const response = await createNewGroupUsecase(dependencies).executeFunction(data)
            if(response.status){
                res.json({status:true,data:response.data})
            }
            else{
                res.json({status:false,message:response.message})
            }
        } catch (error) {
            console.log("error in create new group controller",error)
        }
    }
    return createNewGroupController
}
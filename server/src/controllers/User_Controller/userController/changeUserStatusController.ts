import { Request,Response } from "express";
import dependencies from "../../../config/dependencies";

export default (dependencies:any) => {
    const {
        useCase:{changeUserStatusUsecase}
    }  =dependencies

    const changeUserStatusController = async(req:Request,res:Response) => {
        try{
        console.log("entered to change user status controller")
    const {userId} = req.body
    console.log("the body for change user status",req.body)
    console.log("th user id is",userId)

    const response = await changeUserStatusUsecase(dependencies).executeFunction(userId)
    if(response.status){
        res.status(200).json({status:true,message:response.message})
    }
    else{
        res.status(400).json({status:false,message:response.message})
    }
}
catch(error){
    console.log("error in change user status controller",error)
    res.status(500).json({status:false,message:"internal server error"})
}
    }
    return changeUserStatusController
}
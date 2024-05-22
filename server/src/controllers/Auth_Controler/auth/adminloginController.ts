import { Request,Response } from "express";

export default (dependencies:any) => {
    const adminAuth = (req:Request,res:Response)=>{
        try{
            console.log("ready")
     const {
        useCase: {adminAuth_UseCase}
     } = dependencies
     console.log("steady=>",req.body)
     const response = adminAuth_UseCase().executeFunction(req.body)
     console.log("po")
     res.send(response).status(200)
    }
    catch(error){
        console.log(error)
    }
}
    return adminAuth
 }
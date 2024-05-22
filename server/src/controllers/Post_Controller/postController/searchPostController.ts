import { Request,Response } from "express";
import dependencies from "../../../config/dependencies";
import { searchPost_useCase } from "../../../useCases/Post_Usecases";

export default (dependencies:any) => {
    const{
        useCase:{searchPost_useCase}
    } = dependencies
    const searchPostController = async(req:Request,res:Response) => {
        try{
            const {regex} = req.params
            console.log("the posatr trtre",regex)
            const response = await searchPost_useCase(dependencies).executeFunction(regex)
            if(response.status){
                res.status(200).json({status:true,message:response.message,posts:response.posts})
            }
            else{
                res.status(400).json({status:false,message:response.message})
            }
        }
        catch(error){
            console.log("error in searchpostcontroller",error)
        }
    }
    return searchPostController
}
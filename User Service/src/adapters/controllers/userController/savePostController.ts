import {Request,Response} from 'express'
import dependencies from '../../../config/dependencies'

export default (dependencies:any) => {

    const {useCase:{SavePost_Usecase}} = dependencies
    
    const SavePostController = async(req:Request,res:Response) => {
   
        
        const data = req.body
        console.log("post body",data);
        
        const response = await SavePost_Usecase(dependencies).executeFunction(data)
        console.log("response of save post controller",response);
        
        if(response.status){
            res.status(200).json({status:true,message:response.message})
        }
        else{
            res.status(400).json({status:false,message:"error in save post controller"})
        }
    }
    return SavePostController
}
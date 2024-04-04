import { Request,Response } from "express";
import { CommentObject } from "../../../utils/interface/interface";
import { log } from "console";

export  default (dependencies:any) => {
    const {
        useCase:{addComment_useCase}
    } = dependencies
    const addCommentController = async(req:Request,res:Response) => {
        try{
          console.log("entered to the add commment controller");
          
            
            const postId = req.body.postId
            const {userId,name:username,comment:text} = req.body
            console.log("bodyyy",req.body);
          console.log("controller postId",postId);
            
            const comment:CommentObject ={
             
              userId,
              username,
              text,
              createdAt:new Date(Date.now()),
              profile:""
            }
            console.log("commment object",comment)
        
            
            
            const response = await addComment_useCase(dependencies).executeFunction(postId,comment);
            console.log("response of comment post controller",response);
            
          if(response.status){
            res.status(201).json(({status:true,message:"comment added",comment:response.comment}))
          }
          else{
            res.status(500).json({status:false,message:"comment not added"})
          }
        }
        catch(error){
            console.log("errror in add comment controlller",error)
        }
    }
    return addCommentController
}
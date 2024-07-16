import { Request,Response } from "express";

export default(dependencies:any) => {
    const showPostForHomeController = async(req:Request,res:Response) => {
        const {useCase :{showPostForHomeUsecase}} = dependencies
          console.log("req partams",req.params)
        const userId = req.params.id
        console.log("the query",req.query)

        const page = parseInt(req.query.page as string,10) || 1
        const limit = parseInt(req.query.limit as string,10) || 10

        console.log("the page",page)
        console.log("the limit",limit)

        const response = await showPostForHomeUsecase(dependencies).executeFunction(userId,page,limit)
        if(response.status){
            res.status(200).json({status:true,data:response.data})
        }
        else{
            res.status(400).json({status:false})
        }
    }
    return showPostForHomeController
}
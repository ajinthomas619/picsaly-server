import { Request,Response } from "express";


export default(dependencies:any) => {
    const {
        useCase:{getCreatedPost_useCase}
    } = dependencies

  const getCreatedPostController = async(req:Request,res:Response) => {
    try {
        const userId = req.params.id
        console.log("usersrdrrfsdf",userId)
        const response = await getCreatedPost_useCase(dependencies).executeFunction(userId)
        if(response.status){
            res.status(200).json({status:true,message:response.message,data:response.data})
        }
        
    } catch (error) {
        console.log("error oin fetching created posts",error)
        res.status(500).json({status:false,message:"error in getting created posts"})
        
    }
  }
  return getCreatedPostController

}
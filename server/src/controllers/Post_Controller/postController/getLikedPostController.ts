import { Request,Response } from "express";

export default(dependencies:any) => {
    const {useCase:{getLikedPosts_useCase}} = dependencies

    const getLikedPostController = async(req:Request,res:Response) => {
        try{
            const userId = req.params.id
            
            const response = await getLikedPosts_useCase(dependencies).executeFunction(userId)
            if(response.status){
                return res.status(200).json({status:true,data:response.data})
            }
            else{
                return res.status(400).json({status:false,mesaage:response.message})
            }
        }
        catch(error){
            console.log("error in getLikedPost controller",error)
            return res.status(500).json("internal server error")
        }
    }
    return getLikedPostController
}
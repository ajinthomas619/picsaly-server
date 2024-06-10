import { Request,Response } from "express";


export default(dependencies:any) => {
    const {
        useCase:{getMonthlyUserCountUsecase}
    } = dependencies

    const getMonthlyUserCountController = async(req:Request,res:Response) => {
        try {
            const monthlyUserCount = await getMonthlyUserCountUsecase(
                dependencies
            ).executeFunction()
            if(monthlyUserCount){
                res.status(200).json(monthlyUserCount)
            }
        } catch (error) {
            console.log("error in getMonthlyUserCountController",error)
            res.status(400).json({status:false,message:"error in finding user"})
        }
    }
    return getMonthlyUserCountController
}
import { Request,Response } from "express";


export default (dependencies:any) => {
    const {
        useCase:{getMonthlyPostCountUsecase}
    } = dependencies

    const getMonthlyPostCountController = async(req:Request,res:Response) => {
        try {
            const monthlyPostCount = await getMonthlyPostCountUsecase(
                dependencies
            ).executeFunction()
            if(monthlyPostCount){
                res.status(200).json(monthlyPostCount)
            }
        } catch (error) {
            console.log("error in get MonthlyPostCountController",error)
            res.status(400).json({status:false,message:"error in finding post"})
            
        }
    }
    return getMonthlyPostCountController
}
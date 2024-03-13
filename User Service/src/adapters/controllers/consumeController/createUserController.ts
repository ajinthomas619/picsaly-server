import { Request,Response } from "express";

export const createUserController = async(dependencies:any,data:any)=>{
    const{consumeUsecase:{createUserUsecase}} = dependencies

    const response = await createUserUsecase(dependencies).executeFunction(data)
    console.log(response,"response from consume controller")
}
import { Request,Response } from "express";

export const createUserController = async(dependencies:any,data:any)=>{
     console.log("entered to the controller")
    const{consumeUsecase:{createUserUsecase}} = dependencies
    console.log("entered to create user controller")

    const response = await createUserUsecase(dependencies).executeFunction(data)
    console.log(response,"response from consume controller")
}
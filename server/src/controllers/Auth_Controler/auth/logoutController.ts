import {Request,Response} from "express"
import { clearAccessTokenFromCookie } from "../../../utils/jwt/jwt"

export default(dependencies:any) => {
    const logoutController = (req:Request,res:Response) => {
        console.log("cookie:=",req.cookies);
        try{
            clearAccessTokenFromCookie("accessToken",res)
            res.clearCookie("accessToken");
            console.log("success")
            res.json({status:true,message:"Logged out successfully."})
        }
        catch(error){
            console.log(error,"errorr")
            res.json(error)
        }
    }
    return logoutController
}
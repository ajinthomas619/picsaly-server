import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    console.log("Auth Middleware")
    if(!req.headers.authorization){
        console.log("No Header")
        throw new Error("Not Authorized")
    }
    else{
        try{
            console.log("tryyy")
            console.log(req.headers.authorization)
            // const decode = jwt.verify(req.headers.authorization,process.env.ACCESS_JWT_SECRET_KEY)
            // console.log("decode :=",decode) 
            next()
        }
        catch(error){
            console.log(error)
            throw new  Error('Invalid Token')
        }
    }
}
export default authMiddleware
import { Request,Response,NextFunction } from "express";

const errorMiddleware = (err: any,req:Request,res:Response,next:NextFunction)=>{
    let statusCode = res.statusCode === 200? 500 :res.statusCode;
    let errMessage = err.messsage;
    if(err.name === 'castError' && err.Kind === 'ObjectId'){
        statusCode = 404;
        errMessage = 'resource not found'
    }
    res.status(statusCode).json({
        errMessage,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}
export default errorMiddleware
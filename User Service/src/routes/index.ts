import userRoute from "./userRoute/userRoute";
import express from 'express'

export const routes=(dependencies:any)=>{
    const router=express()
    router.use('/user',userRoute(dependencies))
    return router
}
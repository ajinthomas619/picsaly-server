import { Request,Response } from "express";
import dependencies from "../../config/dependencies";

export default (dependencies:any) => {
    const {
        useCase: {verifyOtp_Usecase},
    } = dependencies

const verifyOtpcontroller = async (req:Request, res:Response) => {
    console.log("sessionnnnnn -",req.session)
    console.log("hellll",req.session.userData)
    const otp  = req.session.otp
    console.log("otpent--",otp)
    
    if(otp === req.session.otp){
        console.log('sessionotp ===',req.session);
        
        const data = req.session.userData;
        console.log("dataaaaa=====",data)
        const response = await verifyOtp_Usecase(dependencies).executeFunction(req.session.userData)
        if(response.status){
            console.log("response is ==",response)


            const { accessToken,refreshtToken} = response
            const user = response.user.response


            req.session.refreshtoken = refreshtToken;
            res.cookie("user-accessToken",accessToken,{
                maxAge: 300000,
                httpOnly:true,
                secure:true
            })
            res.cookie("user-refreshToken",refreshtToken,{
                maxAge:360000,
                httpOnly:true,
                secure:true
            })
            const userData = {
                _id:user?.userId?._id ,
                name:user?.name,
                email:user?.email,
                phone:user?.phone|| "",
                isGoogle:user?.isGoogle,

            }
            console.log('User Data :---',userData);
            req.session.otp = undefined;
            req.session.userData = undefined;

            res.status(201).json({status: true,accessToken: accessToken,user: user})
        }else{
            res.status(401).json({status:false,message:response.message})
        } 
        
        }
    }
    return verifyOtpcontroller
}



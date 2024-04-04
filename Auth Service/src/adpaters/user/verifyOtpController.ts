import { Request,Response } from "express";
import dependencies from "../../config/dependencies";
import { authProducer } from "../../events/authproducer";

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
        console.log( response.user," response.user response.user response.user");
        
        if(response.status){


            const { accessToken,refreshtToken} = response
            const user = response.user.user


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
            console.log(user ,"user user ");
            console.log(user._id ,"user._id user._id ");
            

            const userData = {
                _id:user._id ,
                name:user?.username,
                email:user?.email,
                phone:user?.mobile || "",
                isGoogle:user?.isGoogle,

            }
            console.log(userData,"userDatauserData");
            await authProducer(userData,'authTopic','createUser')
             console.log('User Data :---',userData);
        

            res.status(201).json({status: true,accessToken: accessToken,user: user})
        }else{
            res.status(401).json({status:false,message:response.message})
        } 
        
        }
    }
    return verifyOtpcontroller
}



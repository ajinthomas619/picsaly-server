import { Request,Response } from "express";


export default (dependencies:any) => {
    const {
        useCase: {verifyOtp_Usecase},
    } = dependencies

const verifyOtpcontroller = async (req:Request, res:Response) => {

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
            const user = response.user


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
                username:user?.username,
                email:user?.email,
                mobile:user?.mobile || "",
                isGoogle:user?.isGoogle,
                password:user?.password

            }
            console.log(userData,"userDatauserData");
      
        

            res.status(201).json({status: true,accessToken: accessToken,user: user})
        }else{
            res.status(401).json({status:false,message:response.message})
        } 
        
        }
    }
    return verifyOtpcontroller
}



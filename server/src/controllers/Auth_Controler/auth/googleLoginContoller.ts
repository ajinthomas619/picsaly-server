import { Request,Response } from "express";
import { createAccessToken } from  "../../../utils/jwt/jwt"


export default (dependencies:any) => {
    const { useCase: { loginWithGoogle_Usecase  }} = dependencies
    const loginWithGoogle = async(req:Request,res:Response)=>{
        console.log("googleeee")
     const { email,name} = req.body
     console.log("googlebody==",req.body)
    

const userData = {
    email,
    name,
    isGoogle:true
}
console.log("googlesuer======",userData)
try{

    console.log("rrrrr")
    const hi = await loginWithGoogle_Usecase(dependencies)
    console.log("depen==",hi)
const response = await hi.executeFunction(userData);
console.log("google result==",response)
if(response.status){
  
    console.log("response is ==",response)


    const {user_accessToken: accessToken,user_refreshToken:refreshtToken} = response
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

   
    res.status(201).json({status:true,accessToken:accessToken,user:user})
    
   

}
else{
    res.status(400).json({
        message:response.message,
    })
}

}
catch(error){
  console.error(error)
    res.status(500).json({message:"An error occured while processing your request"})
}
 }
 return loginWithGoogle;
}
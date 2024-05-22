import { Request,Response} from "express"


export default (dependencies: any) => {
    const{
        useCase:{ userLogin_useCase }
    } = dependencies

const loginUserController = async(req:Request,res:Response) => {
    const {email,password} = req.body
   
    console.log("reqbodyyy ===",req.body)


    const response = await userLogin_useCase(dependencies)(
       email,password
    )
    if(!response?.status){
    res.json({status:false,message:response.message})
    }else{
        const {user,user_accessToken,user_refreshToken} = response
        req.session.refreshtoken = user_refreshToken
        res.cookie("user_accessToken",user_accessToken,{
            maxAge:300000,
            httpOnly:true,
            secure:true
        })
        res.cookie("user_refreshToken",user_refreshToken,{
            maxAge:3600000,
            httpOnly:true,
            secure:true,
            sameSite:"strict",
        })
        res.status(201).json({status:true,accessToken:user_accessToken,user:user})
    }
}
return loginUserController
}
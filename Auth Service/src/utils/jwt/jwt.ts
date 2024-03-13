import jwt from 'jsonwebtoken'
import { Response } from "express"

export const createAccessToken = (
    user: Object,
    AccessTokensecretkey: string,
    Expiration:string,
 ) => {
  console.log("access token creating")
  const token = jwt.sign({ user },AccessTokensecretkey,{
    expiresIn:Expiration ,
  })
  return token
}

export const createRefreshToken = (
    user: Object,
    RefreshTokensecretkey: string,
    Expiration : string
) => {
    return jwt.sign({user},RefreshTokensecretkey,{expiresIn:Expiration})
}

export const clearAccessTokenFromCookie = (
    cookieName: string,
    res:Response
) => {
    res.cookie(cookieName,{
        httpOnly: false,
        secure: false,
        signed: false,
        maxAge: 0,
    })
}

export const decodeRefreshToken=(token:string)=>{
    const refreshSecret:any=process.env.REFRESH_SECRET_KEY
    let playload:any
    return jwt.verify(token,refreshSecret,(err:any,decode:any)=>{
        if(err){
            console.log(err,Error)
            return {status:false,message:"error in jwt sign"}
        }
        else{
            playload=decode
            console.log(playload,"decode playloadddd")
            return {status:true,message:"error in jwt sign",data:playload}
        }
    })
}
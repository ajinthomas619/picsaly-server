import jwt from 'jsonwebtoken'
import {createAccessToken} from '../../utils/jwt'

export const refreshTokeUsecase = async(dependencies:any) => {
    const {repository:{authRepository}} = dependencies
    const refreshSecret:any = process.env.REFRESH_SECRET_KEY
    if(!authRepository) {
        return {status:false,message:"repository not found"}
    }
    const executeFunction = async(token:string) => {
        let playload:any

        jwt.verify(token,refreshSecret,(err:any,decode:any) => {
            if(err){
                console.log(err);
                return {status:false, message:'error in jwt sign'}
            }
            else{
                playload=decode
            }
        })
      if(!playload.user){
        return{status:false,message:"playload not found"}
      }
      const user = await authRepository.getUserById(playload.user.id)
      if(!user){
        return{status:false,message:"no user"}
      }
      const accessToken = createAccessToken(user,process.env.ACCESS_SECRET_KEY!,process.env.ACCESS_EXPIRY!)
      return {status:true,accessToken}
    }
    return{executeFunction}
}
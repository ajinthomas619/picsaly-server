import { createAccessToken,createRefreshToken } from '../../../utils/jwt/jwt';
import { comparePassword } from "../../../utils/hashPassword/hashPassword";

export const userLogin_useCase = (dependencies:any) => {
    const {
        repository:{userRepository},
    } = dependencies

 const executeFunction = async(email:string,password:string) => {
    const response = await userRepository?.findUser(email)
    console.log("resp =>>>",response)

    if(!response.status){
        return { status:false,message:response?.message}
    }
    else{
        const  user = response
        console.log("hashed pass",user.finduser.basicInformation.password);
        
        const validPass = await comparePassword(password,user.finduser.basicInformation.password)
          console.log("validpass=>>",validPass)
        if(validPass){
            const user_accessToken = createAccessToken(
                user,
                process.env.ACCESS_SECRET_KEY || '',
                process.env.ACCESS_EXPIRY || ''
            )
            const user_refreshToken = createRefreshToken(
                user,
                process.env.REFRESH_SECRET_KEY || '',
                process.env.REFRESH_EXPIRY || ''
            )
            console.log('access tokennn',user_accessToken)
            console.log('refresh token',user_refreshToken)
            return { status:true, user:user,user_accessToken:user_accessToken,user_refreshToken:user_refreshToken}

        }
        else{
            return {status:false,message:"Email and Password is incorrect"}
        }
    }
 }
 return executeFunction
}
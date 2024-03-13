import { createAccessToken,createRefreshToken } from "../../utils/jwt";
import { userData } from "../../utils/interfaces/userinterface";


export const loginWithGoogle_Usecase = async(dependencies:any) => {
    const { repository: {userRepository}} = dependencies
    const executeFunction = async(data:userData) => {
        console.log("execu")
  
    const userExist = await userRepository.findUser(data?.email)
    // if(userExist){
    //       return {status:false, message:"User Already Exist"}
    // }else{
        const newUser = await userRepository.createUser(data)
        console.log("google user==",newUser)
        const user_accessToken = createAccessToken(
            newUser,
            process.env.ACCESS_SECRET_KEY || '',
            process.env.ACCESS_EXPIRY || ''
        )
        const user_refreshToken = createRefreshToken(
            newUser,
            process.env.REFRESH_SECRET_KEY || '',
            process.env.REFRESH_EXPIRY || ''
        )
        console.log('access tokennn',user_accessToken)
        console.log('refresh token',user_refreshToken)
        return {
    
            status:true,
    
            message:"user created successfully",
            user:newUser,
            user_accessToken,
            user_refreshToken
            
        }
    // }

    }


    return { 
        executeFunction
    }  
    
    
}
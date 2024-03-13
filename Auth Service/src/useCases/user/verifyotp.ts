
import { createAccessToken,createRefreshToken} from "../../utils/jwt"
import { hashPassword } from "../../helpers";


export const verifyOtp_Usecase = (dependencies:any) => {
    const {
        repository: { userRepository },
    } = dependencies;
      
const executeFunction = async(data:any) => {
    console.log("orginal data====",data.password)
    const hashedPassword = await hashPassword(data?.password);
     const updatedData = {...data,password:hashedPassword}
    const addUserData = await userRepository.createUser(updatedData)
    console.log("addUserData===",addUserData)
    if(addUserData.status){
        const accessToken = createAccessToken(
            addUserData,
            process.env.ACCESS_SECRET_KEY!,
            process.env.ACCESS_EXPIRY!
            )
        const refreshtToken = createRefreshToken(
            addUserData,
            process.env.REFRESH_SECRET_KEY!,
            process.env.REFRESH_EXPIRY!
            )
        return { status:true , accessToken:accessToken,refreshToken:refreshtToken,user:addUserData,message:"otp verified"}
    }
    else{
        return { status :false}
    }
}
return{
    executeFunction
}
}


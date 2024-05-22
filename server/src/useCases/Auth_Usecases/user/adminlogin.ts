
import dotenv from "dotenv"
dotenv.config()

export const adminAuth_UseCase=()=>{
    const executeFunction=(credentials:any)=>{
        try{
        if(process.env.ADMIN_EMAIL===credentials.email && process.env.ADMIN_PASSWORD === credentials.password){
            return { authSuccess:true}
        }
        else{
            return {authSuccess:false}
        }
    }
    catch(error){
        console.log(error)
    }
}
    return {executeFunction}
}
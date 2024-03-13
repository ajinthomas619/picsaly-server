import { userData } from "../../entities";
import { sendOtp } from "../../helpers";

export const addUser_useCase =(dependencies: any)=>{
    const{ repository: { authRepository}} = dependencies;

    const executeFunction = async(data: userData) =>{
        try{
           
        const userExist = await authRepository?.userEmailExist(data?.email);
    if(userExist){
        return { status: false, message: "User Already Exist"}
    }
    const response = await sendOtp(data?.email);
    if(response?.status){
        const { otp } = response;
        return { status:true,data,otp:otp}

    }else{
        return {status: false,message:'invalid otp'}
    }
        } catch(error){
            console.error('Error creating user:',error)
            return {status: false,message:'An error occured'}
        }
    
    };
    return {
        executeFunction,
    }
};
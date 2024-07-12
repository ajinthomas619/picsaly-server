import { User } from "../../database/userModel";
import mongoose from "mongoose"
import { hashPassword } from "../../../utils/hashPassword/hashPassword";
import loginController from "../../../controllers/Auth_Controler/auth/loginController";



export default{
userEmailExist: async(email: string)=>{
try{
    const response = await User.findOne({
        "basicInformation.email": email,
    });
    if(response){
    return {status:true,message:"email exists"};
    }
}
catch(error){
    console.log("Error in userEmailExist", error);
};
},


    createUser: async(data: any) => {
       
        const userData = {
            username:data.username,
            fullname:data.fullname,
            email: data.email,  
            password: data.password, 
            mobile: data.mobile,
        }
       
        
        const user = await User.create(userData)
     
       if(user){
        return{status: true,message:"user created successfully",user}
       }
       else{
        return{status: false,message:'user creation failed'}
       }
        
    },


    findUser:async(email:string) =>{
        try{
            const user = await User.find({email:email,'basicInformation.isBlocked':false})
            if(user){
                
                    return{status:true,user:user}
             
            }
            else{
                return{status:false,message:'Email and Password is incorrect '}
            }
        }
        catch(error){
            console.log(error,"Error while finding user")
        }
    
    }

}
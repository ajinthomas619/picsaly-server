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
        console.log("enterred to create user");
        
   
     console.log("data for vewri",data);
     
        const userData = {
            username:data.username,
            fullname:data.fullname,
            email: data.email,  
            password: data.password, 
            mobile: data.mobile,
        }
        console.log("the user dataa for",userData);
        
        const user = await User.create(userData)
        console.log(user,"helllaaa")
       if(user){
        return{status: true,message:"user created successfully",user}
       }
       else{
        return{status: false,message:'user creation failed'}
       }
        
    },


    findUser:async(email:string) =>{
        try{
            const user = await User.findOne({email:email})
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
import { Userdata } from "../../utils/interface/interface";

export const editUserUsecase = (dependencies:any)=>{
    try{
        const {repository:{userRepository}}=dependencies
        const executeFunction = async(data:Userdata,id:any)=>{
            console.log("edituser data",data)
           const response = await userRepository.editUserProfile(data,id)
           console.log("response of edit user profile",response)
           if(response){
            const {fullname,username,userId,phone,gender,email} = response.user.basicInformation
            const bio = response.user.profile.Bio
            const data = {fullname,username,userId,phone,gender,bio,email}
            console.log("deiii",data)
            return {status: response.status,message:response.message,user:data}
           }
           else{
            return { status:false,message:"Response not found"}
           }
        }
        return {executeFunction}
    }
    catch(error){
        console.log("error in edituser usecase",error)
    }
}
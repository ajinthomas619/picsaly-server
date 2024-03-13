export const editUserUsecase = (dependencies:any)=>{
    try{
        const {repository:{userRepository}}=dependencies
        const executeFunction = async(data:any,userId:string)=>{
            console.log("edituser data",data)
           const response = await userRepository.editUserProfile(data,userId)
           console.log("response of edit user profile",response)
           if(response){
            const {fullName,userName,userId,phone,gender} = response.user.basicInformation
            const {bio} = response.user.profile
            const data = {fullName,userName,userId,phone,gender,bio}
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
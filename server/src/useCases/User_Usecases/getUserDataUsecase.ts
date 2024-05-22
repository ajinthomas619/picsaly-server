

export const getUserDataUsecase = (dependencies:any)=>{
    try{
        const {repository:{userRepository}} = dependencies
        const executeFunction = async(email:string)=>{
            console.log("email",email)
            const response = await userRepository.findUser(email)
            console.log("userdata aaaa",response)
            if(response){
                return {status:response.status,message:response.message,userData:response.findUser}
            }
            else{
                return {status:false,message:"error infetching userdata"}
            }
        }
        return {executeFunction}
        
    
    }
    catch(error){
        console.log("error in getUserdatauisecase",error)
    }
}
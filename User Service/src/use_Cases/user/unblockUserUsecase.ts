

export const UnblockUser_Usecase = (dependencies:any) => {
    const {repository:{userRepository}} = dependencies
    const executeFunction = async(userId:any,userToUnblockId:any) => {
        const response = await userRepository.unblockUser({userId,userToUnblockId})
       
         if(response.status){
            return {status:true,data:response.data}
         }
         else{
            return{status:false,message:response.message}
         }


    }
    return {executeFunction};
}
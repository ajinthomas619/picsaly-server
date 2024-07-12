

export const BlockUser_Usecase = (dependencies:any) => {
    const {repository:{userRepository}} = dependencies
    const executeFunction = async(userId:any,userToBlockId:any)=>{
        const response = await userRepository.blockUser(userId,userToBlockId);
        if(response.status ){
            return {status:true,message:response.message}
        }
        else{
            return {status:false,message:response.message}
        }
    }
    return {
        executeFunction
    }
}


export const BlockUser_Usecase = (dependencies:any) => {
    const {reppository:{userRepository}} = dependencies
    const executeFunction = async(userId:any,userToBlockId:any)=>{
        const response = await userRepository.blockUser({userId,userToBlockId});
        if(response.status ){
            return {status:true,data:response.data}
        }
        else{
            return {status:false,message:response.message}
        }
    }
    return {
        executeFunction
    }
}
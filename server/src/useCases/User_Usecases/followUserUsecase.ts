

export const followUser_Usecase = (dependencies:any) => {
    const {repository:{userRepository}} = dependencies

    const executeFunction = async(currentUserId:string, followUserId:string) => {
        const response = await userRepository.followUser(currentUserId,followUserId)
        if(response){
            return {status:response.status,message:response.message}
        }
        else{
            return {status:false,message:"db crashed"}
        }
    }
    return {executeFunction}
}
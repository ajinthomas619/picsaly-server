

export const getFollowingUsecase = (dependencies:any) => {
    try {
        const {repository:{userRepository}} = dependencies
        const executeFunction = async(userId:string) => {
            const response = await userRepository.getFollowing(userId)
            if(response.status){
                return{status:true,message:response.message,data:response.data}
            }
            else{
                return{status:false,message:response.message}
            }
        }
        return {executeFunction}
    } catch (error) {
        console.log("error in getFollowing usecase",error)
    }
}
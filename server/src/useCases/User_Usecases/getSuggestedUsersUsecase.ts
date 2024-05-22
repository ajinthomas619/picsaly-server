export const getSuggestedUser_useCase = (dependencies:any) => {
    try{
        const {repository:{userRepository}} = dependencies
        const executeFunction = async(userId:string) => {
            const response = await userRepository.getSuggestedProfile(userId)
            if(response.status){
                return {status:true,message:response.message,data:response.data}
            }
            else{
                return {status:false,message:response.message}
            }
        }
        return {executeFunction}
    }
    catch(error){
        console.log("error in getSuggestedUser usecase",error)

    }
}
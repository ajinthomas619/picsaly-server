

export const getCreatedPost_useCase = (dependencies:any) => {
    const{
        repository:{userRepository}
    } = dependencies

    const executeFunction = async(userId:string) => {
        try{
            const response = await userRepository.getCreatedPosts(userId)
            if(response.status){
                return{status:true,message:response.message,data:response.data}
            }
        }
        catch(error){
            console.log("error in create post usecase",error)
            return{status:false,message:"error in getting created post"}
        }
    }
    return {executeFunction}
}
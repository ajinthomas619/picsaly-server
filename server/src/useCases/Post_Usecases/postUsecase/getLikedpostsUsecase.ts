export const getLikedPosts_useCase = (dependencies:any) => {
    const {
        repository:{postRepository}
    }  = dependencies

    const executeFunction = async(userId:any) => {
        try {
            const response = await postRepository.getLikedPost(userId)
            if(response.status){
                return {status:true,data:response.data}
            }
            else{
                return {status:false,message:"no post found"}
            }
        } catch (error) {
            console.log("error in getLikedPostusecase",error)
            return{status:false,message:"an error occured in getLiedPostUsecase"}
            
        }
    }
    return{executeFunction}
}
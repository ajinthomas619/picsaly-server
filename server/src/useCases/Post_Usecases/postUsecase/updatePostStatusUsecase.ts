export const updatePostStatusUsecase = (dependencies:any) =>{
    const{
        repository:{postRepository}
    } = dependencies

    const executeFunction = async(postId:string) => {
        try {
            const response = await postRepository.updatePostStatus(postId)
            if(response.status){
                return {status:true,message:response.message,post:response.post}
            }
            else{
                return {status:false,message:response.message}
            }
        } catch (error) {
            console.log("error in update post status usecase",error)
            return {status:false,message:"internal server error"}
        }
    }
    return {executeFunction}
}
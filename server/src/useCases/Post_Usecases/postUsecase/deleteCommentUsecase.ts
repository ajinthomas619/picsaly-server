export const deleteComment_useCase = (dependencies:any) => {
    const {
    repository:{postRepository}
    } = dependencies

    const executeFunction = async(postId:string,commentId:string) => {
        try{
        const response = await postRepository.deleteComment(postId,commentId)
        if(response){
            return {status:true,message:response.message}
        }
        else{
            return {status:false,message:response.message}
        }
    }
    catch(error){
        console.log("error in delete comment usecase",error)
        return {status:false,message:"error in deleting comment"}
    }
}
        return {executeFunction}
}
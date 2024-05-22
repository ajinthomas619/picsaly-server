export const likeComment_useCase = (dependencies:any) => {
    const {
        repository:{postRepository}
    } = dependencies

    const executeFunction = async(
        postId:string,
        commentId:string,
        userId:string,
        isLiked:boolean
    ) => {
        try{
        const response = await postRepository.likeComment(
            postId,
            commentId,
            userId,
            isLiked
        )
        if(response.status){
            return {status:true,message:response.message}
        }
        else{
            return {status:false,message:response.message}
        }
    }
    catch(error){
        console.log("error in likecommentusecase",error)
    }
}
return {executeFunction}
}
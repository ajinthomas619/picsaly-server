export const likeComment_useCase = (dependencies:any) => {
    const {
        repository:{postRepository}
    } = dependencies

    const executeFunction = async(
        postId:string,
        userId:string,
        commentId:string,
        Liked:boolean
    ) => {
        try{
        const response = await postRepository.likeComment(
            postId,
            userId,
            commentId,
            Liked
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
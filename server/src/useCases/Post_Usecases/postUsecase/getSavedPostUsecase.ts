export const getSavedPost_useCase = (dependencies:any) => {
    const{
        repository:{postRepository}
    }=dependencies

    const executeFunction =async(userid:string) => {
        try{
            const response = await postRepository.getSavedPosts(userid)
            console.log("reponse of getsavedposts usecase",response.posts)
            if(response.status){
                return{
                    status:true,
                    message:response.message,
                    posts:response.posts
                }
            }
            else{
                return {status:false,message:response.message}
            }
        }
        catch(error){
            console.log("error in save post usecase",error)
            return {status:false,message:"error in getting posts"}
        }
    }
    return {executeFunction}
}
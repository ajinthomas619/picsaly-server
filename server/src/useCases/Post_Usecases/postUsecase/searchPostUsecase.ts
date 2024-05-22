export const searchPost_useCase = (dependencies:any) => {
    const {
        repository:{postRepository}
    } = dependencies
     const executeFunction = async(regex:string) => {
        try{
            const response = await postRepository.searchPost(regex)
            if(response.status){
                return{
                    status:true,
                    message:response.message,
                    posts:response.posts
                }
            }
            else{
                return{status:false,message:response.message}
            }
        }
        catch(error){
            console.log("error in search post usecase",error)
            return{status:false,message:"error in finding posts"}
        }
     }
     return {executeFunction}
}
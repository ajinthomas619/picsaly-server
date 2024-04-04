export const deletePost_useCase = (dependencies:any) => {
    const {
        repository:{postRepository}
    } = dependencies

    const executeFunction = async(id:string) => {
        try{
            const response = await postRepository.deletePost(id)
            if(response.status){
                return {status:true,message:response.message}
            }
            else{
                return {status:false,message:response.messaage}
            }
        }
        catch(error){
            console.log(error,"error in deletepost usecase")
        }
    }
    return {executeFunction}
}
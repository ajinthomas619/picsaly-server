export const showPostForHomeUsecase = (dependencies:any) => {
    const {repository:{postRepository}} = dependencies

    const executeFunction = async(userId:string) => {
         const response = await postRepository.showPostForHome(userId)
         if(response.status){
            return {status:true,data:response.data}
         }
         else{
            return {status:false}
         }
    }
    return {
        executeFunction
    }
}
export const getAllPostOfUserUsecase = (dependencies:any) => {
    const {
        repository:{postRepository}
    } = dependencies
 const executeFunction = async(userId:any) => {
    try{
   const response = await postRepository.getAllPostOfUser(userId)
   if(response.status){
    return {status:true,data:response.data}
   }
   else{
    return {status:false,message:"No post found for the user"}
   }
    }
    catch(error){
        console.error("Error from getAllPostOfUser usecase",error)
        return {status:false,message:"An error occurred while executing the usecase"}
    }
 }
 return  {executeFunction}
}
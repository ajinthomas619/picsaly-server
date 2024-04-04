export const SavePost_Usecase = (dependencies:any) => {
    const {repository:{userRepository}} = dependencies
    const executeFunction = async(data:any) => {
        const response = await userRepository.savePost(data)
        console.log("response of save post usecase",response);
        
        if(response.status){
            return {status:true,data:response.data}
        }
        else{
            return {status:false,message:response.message}
        }
    }
    return {
        executeFunction
    }
}
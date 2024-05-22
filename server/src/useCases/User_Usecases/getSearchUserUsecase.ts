export const getSearchUserUsecase = (dependencies:any) => {
    const {repository:{userRepository}} = dependencies

    const executeFunction = async(regex:string) => {
        const response = await userRepository.getSearchUsers(regex)
        if(response.status){
            return {status:true,message:response.message,data:response.data}
        }
        else{
            return {status:false}
        }
    }
    return {
        executeFunction
    }
}
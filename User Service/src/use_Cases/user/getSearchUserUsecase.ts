const getSearchUserUsecase = (dependencies:any) => {
    const {repository:{userRepository}} = dependencies

    const executeFunction = async(user:string) => {
        const response = await userRepository.getSearchUsers(user)
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
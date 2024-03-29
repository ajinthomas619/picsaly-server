export const getAllUsersUsecase = (dependencies:any)=>{
    try{
    const {repository:{userRepository}} = dependencies
    const executeFunction = async()=>{
        const response =await userRepository.getAllUsers()
        if(response.status){
            return {status:true,data:response.data}
        }
        else{
            return{status:false}
        }
    }
    return {executeFunction}
}
catch(error){
    console.log("error in getalluserusecase",error)
}
}
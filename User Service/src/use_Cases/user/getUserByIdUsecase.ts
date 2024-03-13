export const getUserByIdUsecase = (dependencies:any)=>{
    try{
        const {repository:{userRepository}} = dependencies

        const executeFunction = async(id:any)=>{
            const response = await userRepository.getUserById(id)
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
        console.log("error in getuserbyid",error)
    }
}
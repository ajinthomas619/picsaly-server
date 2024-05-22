export const getUserByNameUsecase =(dependencies:any)=>{
    try{
        const {repository:{userRepository}} = dependencies
        const executeFunction = async(name:string)=>{
            const response =await userRepository.getUsersByName(name)
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
        console.log("error in getuserbyname",error)
    }
}
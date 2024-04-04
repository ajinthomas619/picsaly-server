export const createUserUsecase = (dependencies:any)=>{
    console.log("enterd to create user consume usecase")
    const {repository:{userRepository}} = dependencies
    const executeFunction = async(data:any) =>{
        const response = await userRepository.createUser(data)
        console.log("usecase response",response)
        if(!response.status){
            return {message:"Email is nott valid",status:false}
        }
        else{
            return {message:"usaer created" , status:true}
        }
    }
    return {executeFunction}
}
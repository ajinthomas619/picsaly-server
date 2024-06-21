export const getAllGroupsOfUserUsecase = (dependencies:any) => {
    const {repository:{chatRepository}} = dependencies

    const executeFunction = async(userId:any) => {
        try {
            const response = await chatRepository.getAllGroupsOfUser(userId)
            if(response.status){
                return{status:response.status,data:response.data}
            }
            else{
                return{status:false,message:response.message}
            }
        } catch (error) {
            console.log("error in get all groups of user usecase",error)
        }
    }
    return{executeFunction}
}
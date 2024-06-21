export const getGroupDataByIdUsecase = (dependencies:any) => {
    const {repository:{chatRepository}} = dependencies

    const executeFunction = async(groupId:any) => {
        try {
            const response = await chatRepository.getGroupDataById(groupId)
            if(response.status){
                return{status:response.status,data:response.data}
            }
            else{
                return{status:false,message:response.message}
            }
        } catch (error) {
            console.log("error in get groupdata byid usecase",error)
        }
    }
    return{executeFunction}
}
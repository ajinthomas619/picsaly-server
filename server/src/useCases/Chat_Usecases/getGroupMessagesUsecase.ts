export const getGroupMessagesusecase = (dependencies:any) => {
    const {repository:{chatRepository}} = dependencies

    const executeFunction = async(groupId:string) => {
        try {
            const response = await chatRepository.getGroupMessages(groupId)
            if(response.status){
                return{status:response.status,data:response.data}
            }
            else{
                return{status:false,message:response.message}
            }
        } catch (error) {
            console.log("error in get group messages usecase",error)
        }
    }
    return{executeFunction}
}
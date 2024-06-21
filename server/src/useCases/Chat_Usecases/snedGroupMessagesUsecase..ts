export const sendGroupMessageUsecase = (dependencies:any) => {
    const {repository:{chatRepository}} = dependencies
    const executeFunction = async(data:any) => {
        try {
            const response = await chatRepository.sendGroupMessage(data)
            if(response.status){
                return{status:response.status,data:response.data}
            }
            else{
                return{status:false,message:response.message}
            }
        } catch (error) {
            console.log("error in send message usecase",error)
        }
    }
    return(executeFunction)
}
export const deleteMessageUsecase = (dependencies:any) => {
    const {repository:{chatRepository}} = dependencies

    const executeFunction = async(messageId:string) => {
        try {
           
            const response = await chatRepository.deleteMessage(messageId)
            if(response.status){
                return{status:response.status,message:response.message}
            }
            else{
                return{status:false,message:response.message}
            }
        } catch (error) {
            console.log("error in delete messaeg usecase",error)
        }
    }
    return {executeFunction}
}
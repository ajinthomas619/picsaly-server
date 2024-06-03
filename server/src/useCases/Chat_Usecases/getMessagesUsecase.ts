

export const getMessagesUsecase = (dependencies:any) => {
    const {
        repository:{chatRepository}
    } = dependencies

    const executeFunction = async(senderId:string,reciverId:string) => {
        try {
            const conversation = await chatRepository.getMessages(
                senderId,reciverId
            )
       
            if(conversation.status){
                return {
                    status:true,
                    message:conversation.message,
                    conversation:conversation.conversation
                }
            }
            else{
                 return{
                    status:false,
                    message:conversation.message
                 }
            }
        } catch (error) {
            console.log("error in getMesage usecase",error)
            return{status:false,message:"error in get message usecase"}
        }
    }
    return {executeFunction}
}
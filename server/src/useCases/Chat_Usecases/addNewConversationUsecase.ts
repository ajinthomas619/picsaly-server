

export  const Conversation_Usecase = (dependencies:any) => {
    const {repository:{chatRepository}} = dependencies

    const executeFunction = async(senderId:string,receiverId:string) => {
        const conversationExist = await chatRepository.isConversationExists(senderId,receiverId)
        console.log("does conversation exists",conversationExist)
        if(!conversationExist.status){
            console.log("does not exist")

            const response = await chatRepository.addNewConversation(senderId,receiverId)
            if(response){
                return {status:response.status,message:response.message}
            }
            else{
                return {status:false,message:"Conversation exist"}
            }
        }
        return {status:false,message:"errorrr"}
    }
    return {executeFunction}
}
export const sendMessageUsecase = (dependencies:any) =>{
    const{
        repository:{chatRepository}
    } = dependencies
    const executeFunction = async(
        senderId:string,
        reciverId:string,
        message:string
    ) => {
        try{
        const response = await chatRepository.sendMessage(
            senderId,
            reciverId,
            message
        )

        if(response.status){
            return{
                status:true,
                message:response.message,
                savedMessage:response.response.savedMessage
            }
        }
        else{
            return {status:false,message:response.message}
        }
    }
    catch(error){
        console.log("error in sendMessage usecase",error)
        return {status:false,message:"error in sendmessage usecase"}
    }
}
return {executeFunction}
}
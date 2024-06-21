
export const videoCallUsecase = (dependencies:any) => {
    const {
        repository:{chatRepository}
    } = dependencies

    const executeFunction = async(
        recieverId:string,
        senderId:string,
        roomId:string
    ) => {
        try {
            const response = await chatRepository.videoCall(
                recieverId,
                senderId,
                roomId
            )
            if(response.status) {
                return response
            }
        } catch (error) {
            console.log("error in videocall usecase",error)
            return {status:false,message:"error in vide call usecase"}
        }
    }
    return{executeFunction}
}
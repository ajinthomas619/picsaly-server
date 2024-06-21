export const messageNotificationUsecase = (dependencies:any) => {
    const {repository:{notificationRepository}} = dependencies

    const executeFunction = async(data:any) => {
        try {
            const response = await notificationRepository.messageNotification(data)
            if(response.status){
                return{status:response.status,data:response.data}
            }
            else{
                return{status:false,message:response.message}
            }
        } catch (error) {
           console.log("error in message notificationn usecase",error) 
        }
    }
    return{executeFunction}
}
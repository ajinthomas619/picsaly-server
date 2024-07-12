export const clearNotificationUsecase = (dependencies:any) => {
    const {repository:{notificationRepository}} = dependencies
    const executeFunction = async(userId:any) => {
        try {
            const response = await notificationRepository.clearNotification(userId)
            if(response.status){
                return {status:response.status,message:response.message}
            }
            else{
                return {status:false,message:response.message}
            }
        } catch (error) {
            console.log("error in clear notification usecase",error)
        }
    }
    return {executeFunction}
}
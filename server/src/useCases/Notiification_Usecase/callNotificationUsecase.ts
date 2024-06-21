
export const callNotificationUsecase = (dependencies:any) => {
    const {repository:{notificationRepository}} = dependencies

    const executeFunction = async(data:any) => {
        try {
            const response = await notificationRepository.callNotification(data)
            if(response.status){
                return{status:response.status,data:response.data}
            }
            else{
                return{status:false,message:response.message}
            }
        } catch (error) {
            console.log("error in call notification usecase",error)
        }
    }
    return{executeFunction}
}
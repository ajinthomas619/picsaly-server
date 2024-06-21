
export const commentNotificationUsecase = (dependencies:any) => {
    const {repository:{notificationRepository}} = dependencies

    const executeFunction = async(data:any,message:any) => {
        try {
            console.log("the notification data",data,message)
            const response = await notificationRepository.commentNotification(data)
            if(response.status){
                return{status:response.status,data:response.data}
            }
            else{
                return{status:false,message:response.message}
            }}
         catch (error) {
            console.log("error in comment notifiaction usecase",error)
        }
    }
    return{executeFunction}
    }

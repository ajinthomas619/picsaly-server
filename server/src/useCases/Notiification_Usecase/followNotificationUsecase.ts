
export const followNotificationUsecase = (dependencies:any) => {
    const {repository:{notificationRepository}} = dependencies

    const executeFunction = async(message:any,data:any) => {
        try {
            console.log("dataa for use case",data)
            const response =await notificationRepository.followNotification(message,data)
            console.log("the response of follow user notification is",response)
            if(response.status){
                return{status:response.status,data:response.data}
            }
            else{
                return{status:false,message:response.message}
            }
        } catch (error) {
         console.log("error in follwo notification usecase",error)   
        }
    }
    return{executeFunction}
}
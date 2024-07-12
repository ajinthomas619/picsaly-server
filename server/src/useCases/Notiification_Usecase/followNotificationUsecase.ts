
export const followNotificationUsecase = (dependencies:any) => {
    const {repository:{notificationRepository}} = dependencies

    const executeFunction = async(message:any,data:any) => {
        try {
            
            const response =await notificationRepository.followNotification(message,data)
           
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
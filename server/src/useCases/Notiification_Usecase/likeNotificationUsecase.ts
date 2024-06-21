export const likeNotificationUsecase = (dependencies:any) => {
    const {repository:{notificationRepository}} = dependencies

    const executeFunction = async(message:any,data:any) => {
        try{
            console.log("the like notification data",data)
        const response = await notificationRepository.likeNotification(message,data)
        if(response.status){
            return {status:response.status,data:response.data}
        }
        else{
            return{status:false,message:response.message}
        }
    }
    catch(error){
        console.log("error in likenotification usecase",error)
    }
    }
    return{executeFunction}
}
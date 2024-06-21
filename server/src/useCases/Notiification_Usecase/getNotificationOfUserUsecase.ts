
export const getNotificationOfUserUsecase = (dependencies:any) => {
    const{repository:{notificationRepository}} = dependencies
const executeFunction = async(userId:any) => {
    try {
        const response = await notificationRepository.getNotificationOfUser(userId)
        if(response.status){
            return{status:response.status,data:response}
        }
        else{
            return{status:false,message:response.message}
        }}
     catch (error) {
        console.log("error in get notification for user usecase",error)
    }
}
return{executeFunction}
}
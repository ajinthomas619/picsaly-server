export const createNewGroupUsecase = (dependencies:any) => {
    const {repository:{chatRepository}} = dependencies

    const executeFunction = async(data:any) => {
        try{
        const response = await chatRepository.createNewGroup(data)
        if(response.status){
            return{status:true,data:response.data}
        }
        else{
            return{status:false,message:response.message}
        }
    }
    catch(error){
        console.log("error in create new group usecase",error)
    }
    }

    return{executeFunction}
}
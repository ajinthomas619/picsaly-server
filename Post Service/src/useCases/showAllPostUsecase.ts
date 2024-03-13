export const showAllPostUsecase = (dependencies:any) => {
    try{
    const { repository:{postRepository}} = dependencies
    const executeFunction = async() => {
        const response = await postRepository.showAllPost()
        if(response.status){
            return {status:true,data:response.data}
        }
        else{
            return {status:false}
        }
    }
    return executeFunction
    }
    catch(error){
        console.log("error in show all post usecase",error)
    }
}
export const showAllPostForAdminUsecase = (dependencies:any) => {
    const{
        repository:{postRepository}
    } = dependencies
    const executeFunction = async() => {
        const response = await postRepository.showAllPostForAdmin()
        if(response){
            return {status:true,data:response.data}
        }
        else{
            return{status:false}
        }
    }
    return{executeFunction}
}
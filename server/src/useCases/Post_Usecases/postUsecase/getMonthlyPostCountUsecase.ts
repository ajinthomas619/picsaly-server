export const getMonthlyPostCountUsecase = (dependencies:any) => {
    const{
        repository:{postRepository}
    } = dependencies
    const executeFunction = async() => {
        try{
            const postPerMonth = await postRepository.getMonthlyPostCount()
            if(postPerMonth){
             return postPerMonth
            }
        }
        catch(error){
            console.log("error in getpostpermonth usecase",error)
            return{
                status:false,
                message:"error in getPostsPerMonth Usecase"
            }
        }
    }
    return {executeFunction}
}
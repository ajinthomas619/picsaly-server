

export const getMonthlyUserCountUsecase = (dependencies:any) => {
    const {
        repository:{userRepository}
    } = dependencies

    const executeFunction = async() => {
        try {
            const usersPerMonth = await userRepository.getMonthlyUsersCount()

            if(usersPerMonth){
                return usersPerMonth
            }
        } catch (error) {
            console.log("error in getMOnthyUsersUsecase",error)

            return{
                status:false,
                message:"error in getMonthlyUsersCountUsecase"
            }
            
        }
    }
    return {executeFunction}
}
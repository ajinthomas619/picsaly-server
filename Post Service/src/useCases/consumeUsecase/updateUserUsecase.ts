import { Userdata } from "../../utils/interface/interface";

export const updateUserUsecase = (dependencies:any) => {
    const {
        repository:{postRepository},
    }=dependencies
    const executeFunction = async(data:Userdata) => {
        const response = await postRepository.updateUser(data)
        if(response.status){
            return{status:true,message:"user updated"}
        }
        else{
            return {status:false,message:"update failed"}
        }
    }
    return executeFunction
}
import { Userdata } from "../../utils/interface/interface";

export const createUserUsecase = (dependencies:any) => {
    console.log("entered to create user usecase")

    const{
        repository:{postRepository}
    } = dependencies
    const executeFunction = async(data:Userdata)=>{
        const response = await postRepository.createUser(data)
        if(!response.status){
            return {message:"data invalid",status:false}
        }
        else{
            return {status:true,message:"user  created successfully"}
        }
    }
    return {executeFunction}
}
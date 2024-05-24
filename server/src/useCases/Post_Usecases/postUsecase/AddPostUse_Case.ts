import { PostData } from "../../../utils/interface/interface";

export const AddPost_Usecase = (dependencies:any) => {
    console.log("enterd to use case")
    const {repository:{postRepository}} = dependencies;
    const executeFunction = async(data:PostData) => {
   
        console.log("dataaa post",data)
        const response = await postRepository?.createPost(data)
        console.log("heyyy",response)
        if(response.status){
            return {status:true,data:response.data}
        }
        else{
            return {status:false,message:"post creation failed"}
        }
    }
    return {executeFunction}

}
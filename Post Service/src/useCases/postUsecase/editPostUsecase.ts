import { PostData } from "../../utils/interface/interface";

export const editPost_useCase = (dependencies:any) =>{
    console.log("entered to edit post usecase");
    
    const {
        repository:{postRepository}
    } = dependencies;

    const executeFunction = async(id:string,data:PostData) => {
        try{
            const response = await postRepository.editPost(id,data)
            console.log("response of update post usecase",response);
            
            if(response.status){
                return {
                    status:true,
                    message:response.message,
                    updatedPost:response.updatedPost
                }
            }
            else{
                return{
                    status:false,
                    message:response?.message??"unknown error occured"
                }
            }
        }
        catch(error){
            console.error("error in update post usecase",error)
            return {
                status: false,
                message: "An error occurred while updating the post",
              };
        }
    }
    return {executeFunction}
}
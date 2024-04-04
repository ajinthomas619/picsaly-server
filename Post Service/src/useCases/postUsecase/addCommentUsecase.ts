import { CommentObject } from "../../utils/interface/interface";

export const addComment_useCase = (dependencies:any) => {
    const {
        repository:{postRepository}
    } = dependencies
    const executeFunction = async(postId:string,comment:CommentObject) => {
        try{
            const response = await postRepository?.addComment(postId,comment)
            console.log("response of oadd comment usecase",response);
            
            if(response.status) {
                return{status:true,message:response.message,comment:response.comment}
            }
            else{
                return{status:false,message:response.message}
            }
        }
        catch(error){
            console.log("Error in Add comment Use Case", error);
            return{status: false , message:"error in adding comment"}
        }
    }
    return {executeFunction}
} 
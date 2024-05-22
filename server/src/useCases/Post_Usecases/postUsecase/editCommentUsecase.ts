import { CommentObject } from "../../../utils/interface/interface";

export const editComment_useCase = (dependencies:any) => {
    const {
        repository:{postRepository}
    } = dependencies

    const executeFunction = async(
        postId:string,
        commentData:CommentObject
    ) => {
        try{
            const response = await postRepository.editComment(postId,commentData)
            if(response.status){
                return{status:true,message:response.message}
            }
            else{
                return {status:false,message:response.message}
            }
        }
        catch(error){
            console.log("error in edit comment usecase",error)
        }
    }
    return {executeFunction}
}
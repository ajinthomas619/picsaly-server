import { reportObject } from "../../../utils/interface/interface";

export const reportPostUsecase = (dependencies:any) => {
const {
    repository:{postRepository}
} = dependencies

const executeFunction = async(
    postId:string,
    userId:String,
    reportObject:reportObject,
) => {
    try {
        const response = await postRepository.reportPost(postId,userId,reportObject)
        if(response.status){
            return {status:true,message:response.message}
        }
        else{
            return {status:false,message:response.message}
        }
    } catch (error) {
        console.log("error in report post usecase",error)
        return {status:false,message:"error in reporting post"}
    }
}
return {executeFunction}
}
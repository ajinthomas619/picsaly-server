export const addPostUsecase = (dependencies:any) => {
    try{
    const {repository:{postRepository}} = dependencies;
    const executeFunction = async(data:any) => {
        console.log("dataaa post",data)
        const response = await postRepository.createPost(data)
        if(response.status){
            return {status:true,response:response.data}
        }
        else{
            return {status:false,message:"post creation failed"}
        }
    }
    return {executeFunction}

    }
    catch(error){
        console.log("error in addpostusecase",error)
    }

}
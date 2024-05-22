

export const getPost_useCase = (dependencies:any) =>{
    const{
        repository:{postRepository}
    } = dependencies

    const executeFunction = async(id:string) => {
        try{
            const response = await postRepository?.getPost(id)
          
            if(response.status){
                return {
                    status:true,
                    message:response.message,
                    post:response.data,
                   
                 
                }
            }
            else{
                return {status:false,message:response.message}
            }
        }
        catch(error){
            console.log("error in finding post usecase",error)
        }
    } 
    return {executeFunction}
}
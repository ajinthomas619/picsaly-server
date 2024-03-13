import { Post } from "../database";

export default{
    createPost:async(data:any) => {
        try{
            const {caption,image,tags,location} = data
            if(!caption || !image){
                return {status:false,message:'caption and image are required'}
            }
            const postData = {
                 caption,
                 image,
                tags:tags || [],
                location:location || {type:"Point",coordinates:[]} 
            }
            const response = await Post.create(postData)
            if(response){
                return{status:true,message:"post created successfully"}
            }
            else{
                return {status:false,message:"Error in creating the post"}
            }
        }
        catch(error){
            console.log("error in createpost",error)
        }
    },
    showAllPost:async() => {
        try{
            const response = await Post.find()
            if(response){
                return {status:true,data:response}
            }
            else{
                return {status:false,message:"No Post have been found"}
            }
        }
        catch(error){
            console.log("error in showallpost",error)
        }
    }
}
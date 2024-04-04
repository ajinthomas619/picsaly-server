import {schema} from'../database'
import { PostData,Userdata,CommentObject } from '../../utils/interface/interface'
import { User } from '../database/schema/userSchema'
import { Post } from '../database/schema/postSchema'
import { rmSync } from 'fs'
import { log } from 'console'






export default{

    createPost: async (dataa:any) => {
        try {
            const { image, data} = dataa;
            const postData = { image,...data };
            console.log("postData", postData);
    
            const response = await schema.Post.create(postData);
    
            
            if (response) {
           
                const postWithUser = await schema.Post.findById(response._id).populate('createdBy') as PostData;
                console.log("hello post with user",postWithUser.createdBy.name); // Access the username of the user who created the post
    
                return { status: true, message: "Post created successfully", post: postWithUser };
            } else {
                throw new Error("Error in creating the post");
            }
        } catch (error) {
            console.error(error);
            return { status: false, message: (error as Error).message };
        }
    },
    showAllPost:async() => {
        try{
            const response = await schema.Post.find({Visibility:true}).populate('createdBy')
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
    },
    createUser:async(data:Userdata) => {
        try{
            const userData = {...data}
            const response = await schema.User.create(userData)
           
            if(response){
                return {status:true,message:"user created successfully",response}
            }
            else{
                return {status:false,message:"user creation failed"}
            }
        }
        catch(error){
            console.log("error in create user in post repository",error)
        }
    },
    updateUser:async(data:Userdata) => {
        try{
            const response = await schema.User.findByIdAndUpdate(data._id,data)
            if(response){
            return { status:true,updatedUser:response}
            }
            else{
                return {status:false,message:"update failed"}
            }  
        }
        catch(error){
            console.log("error in update user in post service",error)
            
        }
    },
    findUser:async(id:Userdata) => {
        try{
            
            const response = await schema.User.findById(id)
         if(response){
            return {status:true,user:response}
         }
         else{
            return {status:false,message:"user not found"}
         }
        }
        catch(error){
            console.log("error in fetching the user details from db",error)
        }
    },
    editPost: async (id:string,data:PostData) => {
        try{
            console.log("dataa =>",data)
            const response = await schema.Post.findByIdAndUpdate(id,{
                caption: data.caption,
                location:data.location,
                ...(data.tags ? { tags: data.tags } : {}),
            },{new:true})
            console.log("response  of edit post repo",response)
            if(response){
                return {status:true,updatedPost:response}
            }
            else{
                return {status:false,message:'post not updated'}
            }
        }
        catch(error){
            console.log("error in update post",error)
            return { status: false, message: 'An error occurred while updating the post' };

        }
    },
    deletePost:async(id:string) => {
        try{
            console.log("repo",id)
            const response =await schema.Post.findByIdAndDelete(id)
            if(response){
                return {status:true,message:"Post deleted successfully"};
            }
            else{
                return {status:false,messsage:"post deletion failed"}
            }
        }
        catch(error){
            console.log("error in post deletion",error)
        }
    },
    likePost: async (postId:string, userId:string, liked:boolean) => {
        try {
            let updateQuery;
            let message;
            
            const post = await schema.Post.findById(postId);

            
            if (!post) {
                return { status: false, message: "Post not found" };
            }
            
            const userLiked = post.Likes.some(like => like.userId === userId);
            if (liked && userLiked) {
                return { status: true, message: "User already liked this post" };
            }
            
            if (liked) {
                updateQuery = {
                    $push: { "Likes": { userId: userId, likescount: 1 } }
                };
                message = "liked";
            } else {
                updateQuery = {
                    $pull: { "Likes": { userId: userId } }
                };
                message = "like removed";
            }
            
            const response = await schema.Post.findByIdAndUpdate(
                postId,
                updateQuery,
                { new: true }
            );
    
            // Calculate total likes by summing likescount of all objects in the Likes array
            const totalLikes = response?.Likes.reduce((total, like) => total + (like.likescount ?? 0), 0);
    
            return {
                status: true,
                message: message,
                likes: totalLikes
            };
        } catch (error) {
            console.log("error in post repo", error);
            return { status: false, message: "like unsuccessful" };
        }
    }
    ,
    
    addComment:async(postId:string,comment:CommentObject) => {
        try{
            console.log("post id to add comment",postId);
            
            const response = await Post.findByIdAndUpdate(
                postId,
                {
                    $push: {comments:comment}
                },
                {new:true}
                
            );
            console.log("response of add comment",response);
            const comments = response?.comments
            console.log("the comment data",comments);
            
            return{
                status:true,
                message:"comment added successfully",
                comment:comments,
            }
        }
        catch(error){
            console.log("Error in adding Comment ", error);
            return {status:false,message:"error in adding comment"}
        }
    },
    getPost:async(id:string) => {
        try{
           
            
            const response = await schema.Post.findById(id)
        
            
            if(!response){
                return {status:false,message:'no such post found'}
            }else{
                const postwithUser = await schema.Post.findById(response._id).populate('createdBy')
                return{status:true,data:postwithUser}
            }
            }
        
            catch(error){
                console.log("error in fetching post",error)
            }
        },

     
    }

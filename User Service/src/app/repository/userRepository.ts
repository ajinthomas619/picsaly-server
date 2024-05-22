import { connections } from "mongoose";
import User from "../database/Schema";


export default{
    createUser:async(data:any)=>{
        try{
            console.log(data,"data from database")

            const userData = {
                "basicInformation.userId" : data._id,
                "basicInformation.fullname":data.fullname,
                "basicInformation.email":data.email,
                "profile.profileUrl":data.profilePic,
                "basicInformation.isGoogle":data.isGoogle,
                "basicInformation.username":data.name,
                
            }
            const response = await User.create(userData)
            console.log("response is",response)
            if(response){
                return{status:true,message:"user created successfully",response}
            }
            else{
                return { status:false,message:"user creation failed"}
            }
        }
        catch(error){
            console.log("error in creating user",error)
        }
    },
    findUser:async(email:string)=>{
        console.log("email from finduser",email)
        try{
            const finduser = await User.findOne({'basicInformation.email':email})
            console.log("finduser=>",finduser)
            if(finduser){
                return({status:true,finduser})
            }else{
                return {status:false}
            }
        }
        catch(error){
            console.log("error in finduser",error)
        }
    },
    getAllUsers:async()=>{
        try{
            let userData:any[] = []
            const users = await User.find()
            console.log("all users",users)
            Promise.all(users.map(async(data:any)=>{
                console.log("daataaaa",data)
                const user={
                    reciverId:data.basicInformation.userId,
                    email:data.basicInformation.email,
                    fullName:data.basicInformation.fullName,
                    profilePic:data.profile.profileUrl,
                }
                userData.push(user)
            }))
            console.log(userData,"user data")

            if(users){
                return { status:true,data:userData}
            }else{
                return  {status:false}
            }
        }
        catch(error){
            console.log("error in getallusers",error)
        }
    },
    getUsersByName:async(fullName:string)=>{
        try{
        if(fullName.trim() !== ''){
            const users = await User.find({'basicInformation.fullName': {$regex: '^' + fullName, $options: 'i'}});

            if(users.length>0){
                return {status:true,data:users}
            }
            else{
                return {status:false}
            }
        }else{
            console.log("what manhhh")
            return {status:false}
        }
    }catch(error){
        console.log("error in get users by name",error)
    }
    },
    getUserById:async(id:any)=>{
        try{
            const user = await User.findOne({'basicInformation.userId':id})
            if(user){
                return{
                    status:true,
                    data:user
                }
            }else{
                return {status:false}
            }
        }
        catch(error){
            console.log("error in get user by id",error)
        }
    },
    addProfile:async(data: any,id: string)=>{
        try{
            console.log(id,"this is the id");
            const response = await User.findOneAndUpdate(

                {'basicInformation.userId':id},
                {
                    $set:{
                        "basicInformation.userName":data.username,
                        "basicInformation.phone":data.phone,
                        "basicInformation.dateOfBirth":data.dob,
                        "basicInformation.gender":data.gender,
                        "profile.bio":data.bio
                    },
                },
                {new:true}
            )
            console.log("response data",response)
            if(response){
                return{
                    status:true,message:"Profile Created Successfully",user:response
                }
            }
            else{
                return{status:false,message:"user creation failed"}
            }
        }
        catch(error){
            console.log("error in add profile",error)
        }
    },
    editUserProfile:async(data:any,id:string) => {
        try{
            console.log(id,"idddd da")
            const response =await User.findOneAndUpdate(
                  {'basicInformation.userId':id},
                  {
                    $set:{
                        'basicInformation.userName':data.username,
                        'basicInformation.fullName':data.fullname,
                        "basicInformation.phone":data.phone,
                        "profile.bio":data.bio,
                        "basicInformation.gender":data.gender
                    },
                  },
                  {new:true}

            )
            console.log("hello response",response)
            if(response){
                return{
                    status:true,
                    message:'Profile Updated successfully',
                    user:response,
                }
            }
            else{
                return{
                    status:false,
                    message:"edit failed",
                    user:false
                }
            }
        }
         catch(error){
            console.log("error in edit user profile",error)
         }
    },
    addprofileImage: async(imageUrl:string,userId:string)=>{
        const response = await User.findOneAndUpdate(
         {'basicInformation.userId':userId},
         {
            $set:{
                "profile/profileUrl":imageUrl,
            },
         },
         {new:true}

        )
        if(response){
            return{
                status:true,
                message:"add image success",
                data:response,
            }
        }
        else{
            return{status:false,message:"add image failed"}
        }
    },
    getSearchUsers:async(user:string)=>{
        console.log("userrrr",user)
        let searchedUsers:any = []
        const userData = await User.find({
            $or:[
                {
                    'basicInformation.fullName':{  $regex:".*" + user + ".*",$options:"i" },
                },{
                    'basicInformation.userName' : {$regex:".*" + user + ".*",$options:"i"},
                },
            ],
        })
        await userData.map((data:any) => {
           const users = {
            id:data?.basicInformation?.userId,
            email:data?.basicInformation?.email,
            fullName:data?.basicInformation?.fullName,
            userName:data?.basicInformation?.userName,
            profile:data?.profile?.profileUrl,
           }
           searchedUsers.push(users)
        })
        if(searchedUsers.length){
            return {status:true,data:searchedUsers}
        }
        else{
            return {status:false}
        }
    },
    followUser:async(currentUserId:string,followedUserid:string) =>{
        const user:any = await User.findOne({'basicInformation.userId':currentUserId})
        const userAlreadyFollows = user.socialConnections.following.some((connection:any) => connection.userId === followedUserid)
        if(userAlreadyFollows){
            const updatedUser = await User.findOneAndUpdate({'basicInformation.userId':currentUserId},
            {$pull:{'socialConnections.following':{userId:followedUserid}}})
            const updatedFolowedUser = await User.findOneAndUpdate({'basicInformation.userId':followedUserid},
            {$pull:{'socialConnections.followers':{userId:currentUserId}}})
            console.log("updated user data",updatedUser)
            console.log("updated follwed user data",updatedFolowedUser)
            if(updatedUser && !updatedFolowedUser){
                return {status:true,message:"unfollowed success"}
            }
            else{
                return {status:false,message:"failed"}
            }
        }
        else{
            const userDetails:any = await User.findOne({'basicInformation.userId':followedUserid})
            const updatedUser = await User.findOneAndUpdate({'basicInformation.userId': currentUserId},{  $push: { 'socialConections.following': { userId: followedUserid,profile: userDetails.profile.profileUrl, fullName: userDetails.basicInformation.fullName}}});      
            const updateFollowedUser = await User.findOneAndUpdate({'basicInformation.userId': followedUserid},{  $push: { 'socialConections.followers': { userId: currentUserId,profile: user.profile.profileUrl, fullName: user.basicInformation.fullName}}});      
            console.log("update user data",updatedUser)
            console.log("updated follow user data",updateFollowedUser)
            if(updatedUser && updateFollowedUser){
                return {status:true,message:"Followed success"}
            }
            else{
                return{status:false,message:"failed"}
            }
        }
    },
    blockUser:async (userId:any,userToBlockId:any) =>{
        try{
            const user = await User.findById(userId)
            const userToBlock = await User.findById(userToBlockId)
            if(!user || userToBlock){
                throw new Error("User or user to block not found")
            }
            if(user.socialConnections?.blockedUsers.includes(userToBlockId)){
                throw new Error('This user is already blocked')
        }
        user?.socialConnections?.blockedUsers.push(userToBlockId)
        await user.save()

        return "user blocked successfully"
    }
    catch(error){
        console.log("error in blocking user",error)
    }
 
},
unblockUser:async(userId:any,userToUnblockId:any) =>{
    try{
        const user = await User.findById(userId)
        if(!user){
            throw new Error("User not found")
        }
        const index = user.socialConnections!.blockedUsers.indexOf(userToUnblockId);
        if(index === -1){
            throw new Error("user is not blocked")
        }
        user.socialConnections?.blockedUsers.splice(index,1)
        await user.save()

        return "User unblocked successfully"
    }
    catch(error){
        console.log("error in unblocking user",error)
    }
},
savePost:async(data:any) => {
    try{
        console.log("data for saving post",data);
        
        const  {userId,postId} =data
        console.log("user idd",data.userId);
        

        
        const user:any = await User.findOne({"basicInformation.userId": data.userId})
        if(user){
            if(!user.activity.saved.includes(postId)){
                user.activity.saved.push(postId)
            }
            else{
                const index = user.activity.saved.indexOf(postId)
                if(index !== -1){
                    user.activity.saved.splice(index,1)
                }
            }
            const response = await  user.save()
            if(response){
                return {status:true,data:response}
            }
            else{
                return {status:false,message:"Error while saving post"}
            }
        }
        else{
            return {status:false,message:"User not found"}
        }
    }
    catch(error){
        console.log("error in saving post",error);
        
    }
}

}
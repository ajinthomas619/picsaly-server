import User from "../database/Schema";


export default{
    createUser:async(data:any)=>{
        try{
            console.log(data,"data from database")

            const userData = {
                "basicInformation.userId" : data._id,
                "basicInformation.fullName":data.fullName,
                "basicInformation.email":data.email,
                "profile.profileUrl":data.profilePic,
                "basicInformation.isGoogle":data.isGoogle,
                
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
            let userData = []
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
            const users = await User.find({'basicInformation.fullName':{$regex:'^'+name,$options: 'i'}})
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
    }
}
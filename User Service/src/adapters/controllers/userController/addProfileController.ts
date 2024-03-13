import { Request,Response } from "express";
import { decodeAccessToken } from "../../utils/jwt";

export default (dependencies: any) => {
    const{
        useCase:{addProfileUsecase}
    } = dependencies

const addProfileController = async(req:Request,res:Response)=>{
try{
    console.log("AddProfileController")
    const{accessToken} = req.cookies
    let userData:any = await decodeAccessToken(accessToken)
    console.log("userData:=",userData)

if(userData.status){
    const userId = userData?.data?.user?._id || userData?.data?.user?.response._id
    const response = await addProfileUsecase(dependencies).executeFunction(req.body,userId)
    console.log("response from controller",response)
    if(response){
        console.log("response userrr",response.user)
        const data={
            dateOfBirth:response.user.basicInformation.dateOfBirth,
            gender:response.user.basicInformation.gender,
            mobille:response.user.basicInformation.phone,
            userName:response.user.basicInformation.userName,
            bio:response.user.profile.bio
        }
        res.json({status:response.status,message:response.message,user:data})
    }
    else{
        res.json({status:userData.status,message:userData.message})
    }
}
     

}catch(error){
    console.log("error in addProfileController",error)
}
}
return  addProfileController;
}
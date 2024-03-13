import { Request,Response, response } from "express";


export default(dependencies:any) =>{
    

    const{useCase:{addUser_useCase}} = dependencies;
    const addUser = async(req:Request,res:Response)=>{
     console.log("bodyyy",req.body)

     const {username,name,email,password,mobile} = req.body
     const data ={
        username:username,
        fullname:name,
        email:email,
        mobile:mobile,
        password:password
    }
    console.log("okdaaaa == ",data)
     if (!username || !name || !email || !password || !mobile) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await addUser_useCase(dependencies).executeFunction({username,name,email,mobile,password})
    if(user?.status){
        const {data,otp} = user
       req.session.userData = data
       console.log("sessio -",req.session)
       console.log("data=====",data)
       req.session.otp = otp
       console.log("otp===",otp)
       res.json({
        status: response?.status,

       })

    }
    else{
        console.log(user.message)
        res.json({status:false,message:user?.message})
    }


}  
return addUser

}
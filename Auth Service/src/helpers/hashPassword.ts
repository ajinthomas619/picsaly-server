import bcrypt from 'bcrypt'

export const hashPassword = async(password:string):Promise<string>  => {

    try{
       
        console.log('hash password')
        const salt =await bcrypt.genSalt(10)
        console.log('saltt===',salt)
        console.log("password===",password)
         

        const hashedPass = await bcrypt.hash(password, salt) 
        console.log(hashedPass)

        return hashedPass

    }
    catch(error){
        console.log(error,'Error in hashing password')
        throw new Error('Error in hashing password')
    }
}
export const comparePassword = async(password:string,hashedPass:string)=>{
    try{
    
        let match = await bcrypt.compare(password, hashedPass);
        return match
    }
    catch(error){
        console.log(error, "Error comparing passwords")
        throw new Error('Error in verifiying passwords')
    }
}

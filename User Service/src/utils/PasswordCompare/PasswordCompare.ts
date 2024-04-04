import bcrypt from 'bcryptjs'

export const verifypassword = async(password:string,hashedPassword:string):Promise<boolean> =>{
    try{
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    }
    catch(error){
        throw new Error('Error Verifying Password')
    }
}
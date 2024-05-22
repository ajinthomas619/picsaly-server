export interface userData {
    username:string;
    fullname: string;
    email: string;
    password:string;
    phone: string;
    isGoogle:  boolean;
    isPremium: boolean;
    isBlocked: boolean; 
}

export class userProfile{
    username:string;
    fullname: string;
    email:string;
    password: string;
    phone: string;
    isGoogle: boolean;
    isPremium: boolean;
    isBlocked: boolean;

constructor({username,fullname,email,password,phone,isGoogle,isBlocked,isPremium}:userData){
this.username = username;
this.fullname=fullname;
this.email = email;
this.password =  password;
this.phone = phone;
this.isGoogle = isGoogle;
this.isBlocked = isBlocked;
this.isPremium = isPremium;
}

}
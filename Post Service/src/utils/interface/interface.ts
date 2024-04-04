export interface Userdata{
    name:string;
    profile?:string;
    email:string;
    isGoogle?:boolean;
    _id:string;
    mobile?:string;
    password:string;

}


export interface PostData {
    _id:string;
    userId:string;
    caption:string;
    image:string;
    like?:any[];
    comment?:any[];
    tags?:any[];
    createdAt:Date;
    location:string;
    createdBy:Userdata;
    reportedUserLists?:any[]
}

export interface CommentObject {
    userId:string;
    text:string;
    username:string;
    profile:string;
    createdAt:Date;

}
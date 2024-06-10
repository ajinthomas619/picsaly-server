const nodemailer =  require('nodemailer');


const otp = Math.floor(Math.random()*9000+1000);
console.log(otp)
const sendOtp = async(email:string) =>{

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "stmp.forwardmail.net",
    port: 587,
    secure: false,
    requireTLS: true,
    auth:{
        user: "kidiloski619@gmail.com",
        pass: 'hbwwvctqwvgcwajm',

    },
});
const info =  await transporter.sendMail({
    from: "kidiloski619@gmail.com",
    to: email,
    subject: "Verify your Account",
    text: `Your otp is ${otp}`,
    html: `<b>  <p>Your otp is ${otp} </p> 
    <br/> <br/>
    <button> Verify </button></b>`,
});
if(info){
    return {status:true,otp:otp}
}
else{
    return{status:false,message:"error in Nodemailer client"}
}
}
export {sendOtp}
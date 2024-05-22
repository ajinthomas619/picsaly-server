import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from './routes';
import dependencies from './config/dependencies';
import session, {MemoryStore,SessionOptions,SessionData} from 'express-session';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db'

dotenv.config()

console.log('SESSION_SECRET_KEY:', process.env.SESSION_SECRET_KEY);

declare module 'express-session'{
  interface Session{
    userData: {
      username:string
      fullname:string,
      email:string,
      password:string,
      phone:string,
      isGoogle:boolean
    }
    otp:string ,
    refreshtoken:string
  }
}

const app =express();
app.use(express.json());

app.use(cookieParser())

app.use(express.static('public/'))

const store = new MemoryStore()
app.use(
    cors({
      origin: "http://localhost:5173",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );
app.use(
  session({

    secret: process.env.SESSION_SECRET_KEY,
     resave:false,
     saveUninitialized:false,
     cookie: {
      maxAge :30*24*60*60*1000,
      httpOnly : true,
     },
     store:store,
  }as SessionOptions)
)

app.use(express.urlencoded({extended:true}));
app.use("/api",router(dependencies));






export {app}


import http from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import { routes } from './routes'
import dependencies from './config/dependencies'
import express from 'express'
import cookieParser from 'cookie-parser'
import session,{MemoryStore,SessionData,SessionOptions} from 'express-session'
import { userconsumer } from './events/userconsumer'


dotenv.config()
const store = new MemoryStore()

declare module 'express-session'{
    interface SessionData{
        userData: {
            _id:string,
            name:string,
            email:string,
            password:string,
            isGoogle:boolean,
            profile:string
        };
        Otp:string,
        profile:string
    }
}



const app = express()
app.use(express.json())
app.use(cookieParser(process.env.COOKIEPARSERSECRET))
app.use(cookieParser())
app.use(express.static('public/'))

app.use(
   cors({
    origin:"http://localhost:5173",
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials:true,
   })
)
app.use(
    session({
        secret:"1235554",
        resave:false,
        saveUninitialized:false,
        cookie: {
            maxAge: 30*60 *60*1000,
            httpOnly:true,
        },
        store:store,
    }as SessionOptions)
)
userconsumer(dependencies)

app.use('/api',routes(dependencies))

export {app}

import http from 'http'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dependencies from './config/dependencies'
import session, {MemoryStore,SessionOptions,SessionData} from 'express-session';
import path from 'path'
import { routes } from './routes'
import connectDB from './config/db'
import cookieParser from 'cookie-parser'
import {userConsumer} from "./events/authConsumer"

dotenv.config()
connectDB()

const app = express()
const store = new MemoryStore()
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public/'))


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
        maxAge :30*60*60*1000,
        httpOnly : true,
       },
       store:store,
    }as SessionOptions)
  )
userConsumer(dependencies)

  app.use(express.urlencoded({extended:true}))
  app.use("/api",routes(dependencies));

  export {app}

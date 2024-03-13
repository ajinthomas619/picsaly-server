import http from 'http'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dependencies from './config/dependencies'
import { routes } from './routes'


const app = express()
const server =http.createServer(app)
dotenv.config()



app.use(
    cors({
      origin: "http://localhost:5173",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );

  app.use("/api",routes(dependencies));

  export {app}

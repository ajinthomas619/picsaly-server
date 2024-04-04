import express from 'express'
import {app} from './app'
import connectDB from './config/db'


const start = async() =>{
    try{
        console.log("enterd")
        await connectDB()
        console.log('connected to databaase')

        app.listen(3002,()=>{
            console.log('server started')
        })
    }
    catch(error){
        console.log(error)
    }
}
start()
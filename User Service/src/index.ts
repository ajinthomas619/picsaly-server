import express from 'express'
import {app} from './app'
import connectDB from './config/db'


const start = async() => {
    try{
        console.log('hi da')
        await connectDB()
        console.log('connected to database')

        app.listen(3001,()=>{
            console.log('server started')
        })
    }
        catch(error){
    console.log(error)
        }
    }
start()

import express from 'express'
import {app} from './app'
import connectDB from './config/db'


const start = async() => {
    try{
        console.log('hi da')
        await connectDB()
        console.log('connected to database')

        await new Promise((resolve:any, reject) => {
            app.listen(3000, () => {
                console.log('Server started');
                resolve();
            }).on('error', (err) => {
                console.error(err);
                reject(err);
            });
        })
    }
        catch(error){
    console.log(error)
        }
    }
start()
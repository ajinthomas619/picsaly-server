import {kafka} from '../config/kafkaClient'
import {addProfileController} from '../adapters/controllers/userController/addProfileController'

const consumer = kafka.consumer({groupId:"user-service"})

export const userconsumer = async(dependencies:any)=>{
    try{
        await consumer.connect()
        await consumer.subscribe({topic:"authTopic",fromBeginning:true})
        await consumer.run({
            eachMessage:async({message})=>{
                const binarydata:any=message.value
                const jsonstring:string=binarydata?.toString()
                const jsondata=JSON.parse(jsonstring)
                const messagetype=jsondata?.type
                if(messagetype == 'createUser'){
                    await addProfileController(dependencies,jsondata.data)
                }
            }
        })
    }
    catch(error){
        console.log('Error in user consumer',error)
    }
}
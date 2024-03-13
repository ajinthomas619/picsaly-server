import {kafka} from '../config/kafkaClient'

const consumer =  kafka.consumer({
    groupId:"user-service"
})

export const userconsumer = async() => {
    try{
      await consumer.connect()
      await consumer.subscribe({topic:"user",fromBeginning:true})

      await consumer.run({
        eachMessage:async({message})=>{
            const binarydata:any = message.value
            const jsonstring:string = binarydata?.toString()
            const jsondata=JSON.parse(jsonstring)
            const messagetype=jsondata?.type
        }
      })
    }
    catch(error){
        console.log('Error in auth consumer',error)
    }
}
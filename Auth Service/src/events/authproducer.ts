import {kafka} from "../config/kafkaClient"

const producer = kafka.producer()
const DEFAULT_PARTITION = 0
const DEFAULT_OFFSET = -1

export const authProducer = async(sendData:any,topic:any,type:any) => {
    try{
        console.log(sendData,"sendDatasendData");
        
        if(!sendData){
            throw new Error("send data doesn not exist")
        }
        await producer.connect()

        let messageData

        if(type === 'createUser'){
            messageData =sendData
            console.log("senmdfsd",sendData)
        }
        else if(type === 'create-search-user'){
          messageData = {
            profileUrl:sendData.profile,
            followers:[],
            following:[],
            userName:sendData.name,
          }
        }
        else{
            throw new Error("invalid message type")
        }
        const messagePayload = {
            type,
            data:messageData,
            partition:DEFAULT_PARTITION,
            offset:DEFAULT_OFFSET
        }
        console.log("Data from the producer:",messageData)

        const  result=await producer.send({
            topic,
            messages:[{value:(JSON.stringify(messagePayload))}]
        })
        console.log("result freom producer",result)
        // if(result && result[0] && result[0]?.error){
        //     throw new Error("Messaeg Production Failed")
        // }

    }
    catch(error){
        console.log("Error in auth producer",error)
    }
    finally{
        await producer.disconnect()
    }
}
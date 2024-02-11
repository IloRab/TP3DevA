import {Kafka} from "kafkajs"
import {getLocalBroker, getTopic} from "../config/config.js";

const isLocalBroker = getLocalBroker()

const redpanda = new Kafka({
    brokers: [
        isLocalBroker ? `${process.env.HOST_IP}:9092` : 'redpanda-0:9092',
        'localhost:19092'],
})

const consumer = redpanda.consumer({groupId : "test"})
const topic = getTopic()

export const connexion = async () => {

    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: false })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const jsoni = JSON.parse(message.value)
            const timestamp = Number (message.timestamp)
            const date = new Date(timestamp)
            console.log(bonneDate(date) +" -- "+ jsoni.user+" : "+jsoni.message)

        },
    })

}

const bonneDate = (date) => {
    return (date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" à "+date.getHours()+" :"+date.getMinutes())
}
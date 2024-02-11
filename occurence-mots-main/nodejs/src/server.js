import {createClient} from 'redis'
import {createServer} from "node:http"
import {Server} from "socket.io"
import {allNotification, canalSocket, httpOptions, redisOptions} from "./config.js"

const httpServer = createServer()
const io = new Server(httpServer, httpOptions)

const subscribe = await createClient(redisOptions)
    .on('error', err => console.log('Redis Client Error', err))
    .connect()

const client = await createClient(redisOptions)
    .on('error', err => console.log('Redis Client Error', err))
    .connect()


io.once("connection", async (socket) => {
    const listener = async (message, channel) => {
        let obj = {}
        const [pattern, key] = channel.split(':') // [pattern:key] <== "__keyspace@0__:*"
        obj[key] = await client.get(key)
        io.emit(canalSocket, JSON.stringify(obj))
    }


    await subscribe.pSubscribe(allNotification, listener)
})

httpServer.listen(5432, '0.0.0.0', () => {
    console.log("demarré !")
})



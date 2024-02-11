import * as Consumer from "./redpanda/consumer.js"


async function start() {
    Consumer.connexion()
}

start()
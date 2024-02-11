import * as Admin from "./redpanda/admin.js"
import * as Producer from "./redpanda/producer.js"

import {getUser} from "./messages/userlist.js";
import {getStringMessage} from "./messages/stringmessages.js";
import {getNumberMessage} from "./messages/numbermessage.js";
import {getConfigNumber, getDebug, getNumberWord, getTimeOut, getTopic, getTypeMessage} from "./config/config.js";

const configNumber = getConfigNumber()
const typeMessage = getTypeMessage()
const numberWord = getNumberWord()
const topic = getTopic()
const debug = getDebug()

async function start() {

    console.log(`Creating topic: ${topic}`)
    await Admin.createTopic(topic)
    console.log("Connecting...")
    const timeRetour = getTimeOut()

    setInterval(() => {
        const user = getUser()
        //console.log(getNumberWord())
        const message = typeMessage === "texte" ?
            getStringMessage(numberWord) :
            typeMessage === "nombre" ?
                getNumberMessage(configNumber) :
                "Config Error : choisir 'nombre' ou 'texte'"

        Producer.getConnection(topic, user, message)
        if (debug) {
            console.log({topic, user, message})
        }

    }, timeRetour)
}

start()
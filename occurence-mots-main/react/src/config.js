import {io} from 'socket.io-client'

const endPoint = "http://localhost:5432";
export const canalSocket = "NodeRedis";
export const config = io(endPoint)
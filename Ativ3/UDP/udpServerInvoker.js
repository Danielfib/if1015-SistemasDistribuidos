const uSIHandler = require('./udpServerInvocationHandler')
const dgram = require('dgram')
const Marshaller = require('../Marshaller')
const Unmarshaller = require('../Unmarshaller')

const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const serverSocket = dgram.createSocket('udp4')

serverSocket.on('message', (data, rinfo) => {
    var msg = Unmarshaller.unmarshall(data)
    handleMessage(msg, rinfo)
    str = msg.toString()
    var operation = str.substring(str.indexOf(":")+1, str.length)
    var answer = "Resposta: " + uSIHandler.processOperation(operation)
    sendTo(answer, rinfo.address, rinfo.port)
});

function sendTo(msg, address, port){
    var data = Marshaller.marshall(msg)
    serverSocket.send(data, port, address, (error) => {
        if(error){
            serverSocket.close()
        } else {
            console.log("data sent!")
        }
    })
}

function handleMessage(msg, rinfo){
    console.log(`>${msg} from client at: ${rinfo.address}:${rinfo.port}`)
}

serverSocket.bind(8080)

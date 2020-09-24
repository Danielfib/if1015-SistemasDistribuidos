const uSIHandler = require('./udpServerInvocationHandler')
const dgram = require('dgram');
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.addListener('line', line => {
    broadcastToClients(line)
})

const serverSocket = dgram.createSocket('udp4')

serverSocket.on('message', (msg, rinfo) => {
    handleMessage(msg, rinfo)
    str = msg.toString()
    var operation = str.substring(str.indexOf(":")+1, str.length)
    var answer = "Resposta: " + uSIHandler.processOperation(operation)
    sendTo(answer, rinfo.address, rinfo.port)
});

function sendTo(msg, address, port){
    serverSocket.send(msg, port, address, (error) => {
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

const dgram = require('dgram');
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var clients = new Set()

rl.addListener('line', line => {
    broadcastToClients(line)
})

const serverSocket = dgram.createSocket('udp4')

serverSocket.on('message', (msg, rinfo) => {
    handleMessage(msg, rinfo)
});

function handleMessage(msg, rinfo){
    console.log(`>${msg} from ${rinfo.address}:${rinfo.port}`)

    if(!clients.has(rinfo.port)){
        clients.add(rinfo.port)
    }
}

function broadcastToClients(msg) {
    for(let client of clients){
        //console.log("broadcasting to: " + client)
        serverSocket.send(msg, client, "127.0.0.1", (error) => {
            if(error){
                clientSocket.close()
            } else {
                console.log("data sent!")
            }
        })
    }
}

serverSocket.bind(8080)

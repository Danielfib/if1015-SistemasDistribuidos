const dgram = require('dgram');
const clientSocket = dgram.createSocket('udp4')
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var name;
var port;

name = rl.question('Enter your name: ', (n) => {
    name = n.toString()
    port = rl.question('Choose a port: ', (p) => {
        port = parseInt(p)
        clientSocket.bind(port)
    })
})

clientSocket.on('message', (msg, rinfo) => {
    handleMessage(msg, rinfo)
});

function handleMessage(msg, rinfo){
    console.log(`>Server: ${msg} from ${rinfo.address}:${rinfo.port}`)
}

rl.addListener('line', line => {
    sendMessage(name + ": " + line)
})

function sendMessage(msg) {
    clientSocket.send(msg, 8080, "127.0.0.1", (error) => {
        if(error){
            clientSocket.close()
        } else {
            console.log("data sent!")
        }
    })
}
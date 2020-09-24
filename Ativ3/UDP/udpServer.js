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
    var answer = "Resposta: " + processOperation(operation)
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

function processOperation(str){
    var elems = str.split(' ')
    var a = parseFloat(elems[0]);
    var b = parseFloat(elems[1]);
    var op = elems[2];
    return calculate(a, b, op);
}

function calculate(a, b, op){
    var result = 0;
    switch(op){
        case '/':
            result = a / b;
            break;
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
    }
    return result.toString();
}

serverSocket.bind(8080)

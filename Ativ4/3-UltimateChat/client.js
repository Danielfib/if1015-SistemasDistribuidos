const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("chat.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const chatPackage = grpcObject.chatPackage;

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const client = new chatPackage.Chat("localhost:40000", 
grpc.credentials.createInsecure())

var name
var call = null

name = rl.question('Choose a name:', (n) => {
    name = n
    call = client.registerNewClient({
        "name": name
    }, (err, response) => {
        id = response;
    })
    
    call.on('data', message => {
        if(message.senderName != name){
            console.log("Message received from " + message.senderName + ": " + message.text)
        }
    })

    call.on('end', e => {
        console.log(">>ended")
        grpc.closeClient(client)
        rl.close()
        process.exit()
    })
})

rl.addListener('line', line => {
    sendMessage(line)
})


function sendMessage(line){
    client.sendMessageToClients({
        "senderName": name,
        "text": line
    }, (err, response) => {
    })
}
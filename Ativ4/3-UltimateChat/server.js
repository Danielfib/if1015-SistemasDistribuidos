const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("chat.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const chatPackage = grpcObject.chatPackage;

const server = new grpc.Server();
server.bind("0.0.0.0:40000",
 grpc.ServerCredentials.createInsecure());

server.addService(chatPackage.Chat.service,
    {
        "sendMessageToClients": sendMessageToClients,
        "registerNewClient": registerNewClient
    });
server.start();

var clients = []

function sendMessageToClients (call, callback) {
    if(call.request.text == 'end'){
        removeClient(call.request.senderName)
        clients.forEach((c) => c.write({
            "senderName": "Server",
            "text": call.request.senderName + " just disconnected :("
        }))
    } else {
        clients.forEach((c) => c.write(call.request))
    }
}

function registerNewClient (call, callback) {
    const newClient = {
        "name": call.request.name
    } 
    clients.push(call)

    console.log("registered client: " + JSON.stringify(newClient))
    call.write({
        "senderName": "Server",
        "text": "Welcome to the chat! there are " + clients.length + " other people here."
    })
}

function removeClient(name){
    clients.forEach(element => {
        if (element.request.name == name){
            element.end()
            clients.pop(element)
        }
    });
}
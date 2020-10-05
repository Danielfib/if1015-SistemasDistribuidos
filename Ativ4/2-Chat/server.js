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
    clients.forEach((c) => c.write(call.request))
}

function registerNewClient (call, callback) {
    const newClient = {
        "name": call.request.name
    } 
    clients.push(call)

    console.log("registered client: " + JSON.stringify(newClient))
}
//#region WebSocket communication to html client
var WebSocketServer = require("ws").Server;
var http = require("http");
http.createServer(function (req, res) {
    res.writeHeader(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });
    httpResource = res;
}).listen(9090);

wss = new WebSocketServer({ port: 8080, path: "/testing" });
var clients = [];
var httpResource;
var requestList = [];

wss.on("connection", function (ws) {
    ws.on("message", function (message) {
        //authorized request
        console.log("Request authorized: %s ", message);
        requestList.splice(message, 1);
        BroadcastToClients();
    });
    
    clients.push(ws);
    console.log("new connection");
    BroadcastToClients();
});

function NewRequest(msg){
    console.log("received msg: " + msg);
    var newRequest = { name: msg }
    requestList.push(newRequest);
    console.log("now we have: " + requestList.length);
    BroadcastToClients();
}

function BroadcastToClients(){
    for(var i = 0; i < clients.length; i++){
        clients[i].send(JSON.stringify(requestList));
    }
}
//#endregion

//#region RabbitMQ queue receiver
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'requestsQueue';

        channel.assertQueue(queue, {
            durable: false
        });
        
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            NewRequest(msg.content.toString());
        }, {
            noAck: true
        });
    });
});
//#endregion
var WebSocketServer = require("ws").Server;

wss = new WebSocketServer({ port: 8080, path: "/testing" });
var clients = [];

wss.on("connection", function (ws) {
    ws.on("message", function (message) {
        console.log("Msg received in server: %s ", message);
        BroadcastToOthers(ws, message);
    });
    
    clients.push(ws);
    console.log("new connection");
});

function BroadcastToOthers(ws, msg){
    for(var i = 0; i < clients.length; i++){
        if(ws != clients[i]){
            clients[i].send(msg);
        }
    }
}
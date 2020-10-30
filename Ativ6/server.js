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

wss.on("connection", function (ws) {
    ws.on("message", function (message) {
        console.log("Msg received in server: %s ", message);
        httpResource.write("data: " + message + "\n\n");
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

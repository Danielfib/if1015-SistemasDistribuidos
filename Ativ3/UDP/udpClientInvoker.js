const dgram = require('dgram');
const clientSocket = dgram.createSocket('udp4')

var port;

clientSocket.on('message', (msg, rinfo) => {
    handleMessage(msg, rinfo)
});

function handleMessage(msg, rinfo){
    console.log(`>${msg} from Server at: ${rinfo.address}:${rinfo.port}`)
}

module.exports = {
    sendMessage: function(msg){
        clientSocket.send(msg, 8080, "127.0.0.1", (error) => {
            if(error){
                clientSocket.close()
            } else {
                //console.log("data sent!")
            }
        })
    },

    setupPort: function(port){
        this.port = port
        clientSocket.bind(port)
    }
}
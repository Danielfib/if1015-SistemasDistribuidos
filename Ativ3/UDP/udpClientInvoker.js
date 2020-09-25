const dgram = require('dgram');
const clientSocket = dgram.createSocket('udp4')
const Marshaller = require('../Marshaller')
const Unmarshaller = require('../Unmarshaller')

var port;

clientSocket.on('message', (data, rinfo) => {
    var msg = Unmarshaller.unmarshall(data)
    handleMessage(msg, rinfo)
});

function handleMessage(msg, rinfo){
    console.log(`>${msg} from Server at: ${rinfo.address}:${rinfo.port}`)
}

module.exports = {
    sendMessage: function(msg){
        var data = Marshaller.marshall(msg)
        clientSocket.send(data, 8080, "127.0.0.1", (error) => {
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
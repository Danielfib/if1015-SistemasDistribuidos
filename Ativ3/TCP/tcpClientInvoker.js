const Marshaller = require('../Marshaller')
const Unmarshaller = require('../Unmarshaller')

const net = require('net')
const client = new net.Socket()

client.connect(4000, '127.0.0.1', () =>{
    console.log('------conectou')
})

client.on('data', (data) =>{
    var msg = Unmarshaller.unmarshall(data)
    console.log('Resposta: ' + msg)
})

module.exports = {
    sendTo: function(msg) {
        var data = Marshaller.marshall(msg)
        client.write(data)
    }
}
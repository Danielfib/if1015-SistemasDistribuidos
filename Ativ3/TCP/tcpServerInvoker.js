const net = require('net')
const Marshaller = require('../Marshaller')
const Unmarshaller = require('../Unmarshaller')
const sIHandler = require('./tcpServerInvocationHandler')

const handleConnection = socket => {
    console.log('alguem se conectou')
    
    socket.on('end', () => {
        console.log('desconectou')
    })
    socket.on('error', (err) =>{
        console.log('ocorreu um erro: ' + err.toString())
    })
    
    socket.on('data', data => {
        const str = data.toString()
        
        if(str === 'end'){
            socket.end()
        } else {
            var msg = Unmarshaller.unmarshall(data)
            var answer = sIHandler.processOperation(msg)
            var answerData = Marshaller.marshall(answer)
            socket.write(answerData)
        }
    })
}

const server = net.createServer(handleConnection)
server.listen(4000, '127.0.0.1')
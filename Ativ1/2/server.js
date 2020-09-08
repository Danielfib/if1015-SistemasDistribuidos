const net = require('net')

const connectedSockets = new Set()

connectedSockets.broadcast = function(data, except) {
    for(let sock of this){
        if(sock != except){
            sock.write(data.toString())
        }
    }
}

const handleConnection = socket => {
    console.log('alguem se conectou')
    connectedSockets.add(socket)
    
    socket.on('end', () => {
        console.log('desconectou')
    })
    socket.on('error', (err) =>{
        console.log('desconectou com erro')
    })

    socket.on('data', data => {
        const str = data.toString()
        if(str === 'end'){
            socket.end()
        }
        connectedSockets.broadcast(data, socket)
    })
}

const server = net.createServer(handleConnection)
server.listen(4000, '127.0.0.1')
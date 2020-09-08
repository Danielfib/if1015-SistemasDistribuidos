const net = require('net')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const handleConnection = socket => {
    console.log('alguem se conectou')
    socket.on('end', () => {
        console.log('desconectou')
    })
    socket.on('error', (err) =>{
        console.log('deu erro heeeein')
    })
    socket.on('data', data => {
        const str = data.toString()
        if(str === 'end'){
            socket.end()
        }
        console.log('Client: ' + data.toString())
    })
    rl.addListener('line', line => {
        //console.log('You: ' + line)
        socket.write(line)
    })
}

const server = net.createServer(handleConnection)
server.listen(4000, '127.0.0.1')
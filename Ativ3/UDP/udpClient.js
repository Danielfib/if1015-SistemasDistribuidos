const udpClientInvoker = require('./udpClientInvoker')
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

port = rl.question('Choose a port(not 8080): ', (p) => {
    port = parseInt(p)
    udpClientInvoker.setupPort(port)
})

rl.addListener('line', line => {
    udpClientInvoker.sendMessage(port + ':' + line)
})
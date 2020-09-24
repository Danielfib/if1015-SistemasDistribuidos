const clientInvoker = require('./tcpClientInvoker')

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.addListener('line', line => {
    sendMessage(line)
})

function sendMessage(msg){
    clientInvoker.sendTo(msg)
}

module.exports = {
    receiveMessage: function(msg){
        console.log('Resposta: ' + msg)
    }
}
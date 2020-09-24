const net = require('net')
const readline = require('readline');
const { debug } = require('console');
const Marshaller = require('./marshaller')
const Unmarshaller = require('./unmarshaller')

const client = new net.Socket()
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

client.connect(4000, '127.0.0.1', () =>{
    console.log('------conectou')

    let marshaller = new Marshaller(client)
    let unmarshaller = new Unmarshaller(client)
    unmarshaller.init()

    rl.addListener('line', line => {
        marshaller.sendTo(line)
    })
})
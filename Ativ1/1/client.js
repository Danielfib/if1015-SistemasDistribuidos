const net = require('net')
const readline = require('readline');
const { debug } = require('console');

const client = new net.Socket()
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var name;

client.on('data', data => {
    console.log('Server: ' + data)
})

client.connect(4000, '127.0.0.1', () =>{
    console.log('conectou')
    name = rl.once('line', line => {
        name = line.toString()
        //console.log('name: ' + name)
    })
    rl.addListener('line', line => {
        //console.log('You: ' + line)
        client.write(line)
    })
})
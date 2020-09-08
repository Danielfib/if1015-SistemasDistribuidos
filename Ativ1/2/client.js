const net = require('net')
const readline = require('readline');
const { debug } = require('console');

const client = new net.Socket()
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

var name;

name = rl.question('Enter your name: ', (n) => {
    startChat(n)
})

function startChat(n){
    name = n.toString()

    //add listener to who is talking
    client.on('data', data => {
        console.log(data.toString())
    })

    connectToServer()
}

function connectToServer(){
    client.connect(4000, '127.0.0.1', () =>{
        console.log('------conectou')
        rl.addListener('line', line => {
            //console.log('You: ' + line)
            client.write(name + ': ' + line)
        })
    })
}
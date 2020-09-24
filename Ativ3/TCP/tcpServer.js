const net = require('net')
const Marshaller = require('./marshaller')
const Unmarshaller = require('./unmarshaller')

const handleConnection = socket => {
    console.log('alguem se conectou')
    let marshaller = new Marshaller(socket)
    let unmarshaller = new Unmarshaller(socket)
    unmarshaller.init()
    
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
            if(unmarshaller._state === 'HEADER'){
                marshaller.sendTo(processOperation(str))
            }
        }
    })
}

function processOperation(str){
    var elems = str.split(' ')
    var a = parseFloat(elems[0]);
    var b = parseFloat(elems[1]);
    var op = elems[2];
    return calculate(a, b, op);
}

function calculate(a, b, op){
    var result = 0;
    switch(op){
        case '/':
            result = a / b;
            break;
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
    }
    return result.toString();
}

const server = net.createServer(handleConnection)
server.listen(4000, '127.0.0.1')
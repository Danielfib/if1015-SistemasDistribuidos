const net = require('net')

const connectedSockets = new Set()

const handleConnection = socket => {
    console.log('alguem se conectou')
    connectedSockets.add(socket)
    
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
        }
        answerClient(processOperation(str), socket);
    })
}

function processOperation(str){
    var a = parseFloat(str.charAt(0));
    var b = parseFloat(str.charAt(2));
    var op = str.charAt(4);
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

function answerClient(r, cSocket){
    cSocket.write("Resposta: " + r);
}

const server = net.createServer(handleConnection)
server.listen(4000, '127.0.0.1')
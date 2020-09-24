function Marshaller(socket){
    this.socket = socket
}

Marshaller.prototype.sendTo = function(msg){
    let buffer = Buffer.from(msg.toString());
    console.log(buffer)
    this.socket.write(buffer)
}

module.exports = Marshaller
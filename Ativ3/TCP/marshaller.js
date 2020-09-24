function Marshaller(socket){
    this.socket = socket
    this._packet = {}
}

Marshaller.prototype.sendTo = function(msg){
    //console.log('respondendo\n')
    let buffer = Buffer.from(msg);
    this._packet.header = {length: buffer.length}
    this._packet.message = buffer

    let contentLength = Buffer.alloc(2);
    contentLength.writeUInt16BE(this._packet.header.length);
    this.socket.write(contentLength)
    this.socket.write(this._packet.message)
    this._packet = {}
}

module.exports = Marshaller
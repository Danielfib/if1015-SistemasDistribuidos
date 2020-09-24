function Unmarshaller(socket){
    this.socket = socket
}

Unmarshaller.prototype.init = function(msg){
    this.socket.on('data', (data) => {
        this._onData(data)
    })
}

Unmarshaller.prototype._onData = function(data){
    console.log('data buffer: ')
    console.log(data)
    console.log('data string: ' + data.toString())
}

module.exports = Unmarshaller
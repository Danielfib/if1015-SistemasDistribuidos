function Unmarshaller(socket){
    this.socket = socket
    this._state = 'HEADER'
}

Unmarshaller.prototype.init = function(msg){
    this.socket.on('data', (data) => {
        this._onData(data)
    })
}

Unmarshaller.prototype._onData = function(data){
    //console.log('oi')
    switch (this._state) {
        case 'HEADER':
            this._state = 'PAYLOAD'
            break;
        case 'PAYLOAD':
            console.log(data.toString())
            this._state = 'HEADER'
            break;
      }
}

module.exports = Unmarshaller
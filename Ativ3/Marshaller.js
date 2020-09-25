class Marshaller {
    static marshall(msg){
        return Buffer.from(msg)
    }    
}

module.exports = Marshaller;
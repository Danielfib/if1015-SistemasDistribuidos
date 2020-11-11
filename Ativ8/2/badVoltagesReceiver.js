var amqp = require('amqplib/callback_api');
var http = require("http");
http.createServer(function(req,res){
    res.writeHeader(200, {"Content-Type":"text/event-stream"
    , "Cache-Control":"no-cache"
    , "Connection":"keep-alive"
    , "Access-Control-Allow-Origin": "*"
}
);
createdRes = res;
}).listen(9090);

var createdRes;
function sendMessage(msg) {
    if(createdRes != null) {
        createdRes.write(msg);
    }
}

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'badVoltageQueue';

        channel.assertQueue(queue, {
            durable: true
        });
        
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received bad voltage %s", msg.content.toString());
            sendMessage("data: " + msg.content.toString() + "\n\n");
        }, {
            noAck: true
        });
    });
});

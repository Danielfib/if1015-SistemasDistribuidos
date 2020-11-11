var amqp = require("amqplib/callback_api");
var createdChannel;
var createdQueue;

amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = "rmqSourceQueue";

        channel.assertQueue(queue, {
            durable: false,
        });

        createdChannel = channel;
        createdQueue = queue;
    });
});

setInterval(() => {
    var msg = randomInt(100, 130);
    createdChannel.sendToQueue(createdQueue, Buffer.from(msg.toString()))
}, 2000);

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
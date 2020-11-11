var rxjs = require('rxjs');
var op = require('rxjs/operators');

const WebSocket = require('ws');
 
const ws = new WebSocket('ws://localhost:8080');

const MIN_V_RANGE = 105;
const MAX_V_RANGE = 120;

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
        var queue = "badVoltageQueue";

        channel.assertQueue(queue, {
            durable: true,
        });

        createdChannel = channel;
        createdQueue = queue;

        console.log("connected!");
    });
});

rxjs.fromEvent(ws, 'message').subscribe((x) => console.log("received: " + x.data));
const voltages = rxjs.fromEvent(ws, 'message');
const voltagesOutsideRange = voltages.pipe(op.filter(e => parseFloat(e.data) < MIN_V_RANGE || parseFloat(e.data) > MAX_V_RANGE));
voltagesOutsideRange.subscribe((x) => { 
    console.log('value outside range: ' + x.data);
    createdChannel.sendToQueue(createdQueue, Buffer.from(x.data));
});
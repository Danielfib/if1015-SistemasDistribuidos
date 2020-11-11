var rxjs = require('rxjs');
var op = require('rxjs/operators');

const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8080');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

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
        var rmqSourceQueue = "rmqSourceQueue";

        channel.assertQueue(queue, {
            durable: true,
        });

        createdChannel = channel;
        createdQueue = queue;

        channel.consume(rmqSourceQueue, function(msg) {
            console.log("[RMQ] Received voltage: ", msg.content.toString());
            myEmitter.emit('rmqMessageRcv', msg.content.toString());
        }, {
            noAck: true
        })

        console.log("connected!");
    });
});

ws.on('message', (x) => {
    console.log("[WS] Received voltage: ", x.toString());
    myEmitter.emit('wsMessageRcv', x.toString());
})

const voltagesWS = rxjs.fromEvent(myEmitter, 'wsMessageRcv');
const voltagesRMQ = rxjs.fromEvent(myEmitter, 'rmqMessageRcv');
const voltages = rxjs.merge(voltagesWS, voltagesRMQ);
const badVoltages = voltages.pipe(op.filter(e => parseInt(e) < MIN_V_RANGE || parseInt(e) > MAX_V_RANGE));
badVoltages.subscribe((x) => {
    createdChannel.sendToQueue(createdQueue, Buffer.from(x));
});
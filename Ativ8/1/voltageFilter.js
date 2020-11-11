var rxjs = require('rxjs');
var op = require('rxjs/operators');

const WebSocket = require('ws');
 
const ws = new WebSocket('ws://localhost:8080');

const MIN_V_RANGE = 105;
const MAX_V_RANGE = 120;

rxjs.fromEvent(ws, 'message').subscribe((x) => console.log("received: " + x.data));
const voltages = rxjs.fromEvent(ws, 'message');
const voltagesOutsideRange = voltages.pipe(op.filter(e => parseFloat(e.data) < MIN_V_RANGE || parseFloat(e.data) > MAX_V_RANGE));
voltagesOutsideRange.subscribe((x) => console.log('value outside range: ' + x.data));
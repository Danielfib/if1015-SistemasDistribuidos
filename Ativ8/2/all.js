const { exec } = require("child_process");

exec('node sourceWs.js')
exec('node sourceRMQ.js')
exec('node voltageFilter.js')
exec('node badVoltagesReceiver.js')
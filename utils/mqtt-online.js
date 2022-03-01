var MQTT = require('async-mqtt');

//open connection MQTT Online
var clientOnline = '';
var optionsOnline = {
    port: 1883,
    host: 'mqtt://broker.hivemq.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: '',
    password: '',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
clientOnline = MQTT.connect(optionsOnline.host, optionsOnline);
console.log(new Date().toLocaleString()+' Trying connected to mqtt://broker.hivemq.com');

    
module.exports = clientOnline
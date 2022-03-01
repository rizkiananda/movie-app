var MQTT = require('async-mqtt');
const config = require('../config')
const logger = require('./winston')
const mqttHost = config.mqtt.host
const mqttPort = config.mqtt.port

//open connection MQTT
var client = ''
var options = {
    port: mqttPort,
    host: 'mqtt://'+mqttHost,
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

client = MQTT.connect(options.host, options);
// console.log(new Date().toLocaleString()+' Trying connected to '+mqttHost+':'+mqttPort);

client.on("error", function (error) {
    logger.error(error)
});

module.exports = client
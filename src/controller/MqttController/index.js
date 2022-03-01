var client = require('../../../utils/mqtt')
const config = require('../../../config')
const mqttHost = config.mqtt.host
const mqttPort = config.mqtt.port
const getRequestId = require('../../../utils/request-id');
var requestId = getRequestId()
const logger = require('../../../utils/winston');


class MqttController {
    static async publishSubscribeMqtt(){
        client.on("connect", async function () {
            try {
                client.subscribe('test/sensor/#')
                logger.info('[MQTT] Connected to Broker '+mqttHost+':'+mqttPort)
            }
            catch (e) {
                logger.error(+'[MQTT] Msg: '+e)
            }
        })
        client.on('message', function (topic, message) {
            var optionConfig = {
                retain:true,
                qos:1
            };
            let dataMessage = message.toString()
            console.log(topic, dataMessage)
            client.publish('test/alarm/1', "1", optionConfig);
            client.publish('test/frontend/1', "message");
        })
    }
    
}

module.exports = MqttController
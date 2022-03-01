const logger = require('../../../utils/winston')
const getRequestId = require('../../../utils/request-id');
var uniqueId = getRequestId()
const readLogs = require('./readLogs')

class Controller {
    static async getInputLog(req, res) {
        const { date, flag, type, requestId} = req.body
        readLogs(flag, date, type, requestId)
        .then(async result => {
            if(result){
                res.send({ status: 'OK', message: "", data: result })
            }
            else{
                logger.error(uniqueId+` [LOG] msg: Failed to get data log!`)
                res.status(400).send({ status: 'Warning', message: "Failed to get data log!" })
            }
            
        })
        .catch(err => {
            return err
        })
    }
}

module.exports = Controller.getInputLog
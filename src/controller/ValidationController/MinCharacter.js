const logger = require('../../../utils/winston')
const getRequestId = require('../../../utils/request-id');
var requestId = getRequestId()
const createObj = require('./createObj')

class Controller {
    static async minCharacter(attributeName, attributeValue, errorMessage){
        try {
            // var messagePerAttribute = []
            if(attributeValue.length < 6){
                let message = "Character must more than 6 digits!"
                await createObj(attributeName, message, errorMessage)
            }
            return 'ok'
        }
        catch (err) {
            logger.error(requestId+` [MIN CHAR VALIDATION], msg: ${err}`)
        }
    }
}


module.exports = Controller.minCharacter
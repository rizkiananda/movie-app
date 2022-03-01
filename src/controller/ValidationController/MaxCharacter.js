const logger = require('../../../utils/winston')
const getRequestId = require('../../../utils/request-id');
var requestId = getRequestId()
const createObj = require('./createObj')

class Controller {
    static async maxCharacter(attributeName, attributeValue, errorMessage){
        try {
            // var messagePerAttribute = []
            if(attributeValue.length > 3){
                let message = "Character must less than 3 digits!"
                await createObj(attributeName, message, errorMessage)
            }
            return 'ok'
        }
        catch (err) {
            logger.error(requestId+` [MIN CHAR VALIDATION], msg: ${err}`)
        }
    }
}


module.exports = Controller.maxCharacter
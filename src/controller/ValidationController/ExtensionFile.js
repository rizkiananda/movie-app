const logger = require('../../../utils/winston')
const createObj = require('./createObj')

class Controller {
    static async extensionFile(attributeName, validExtension, attributeValue, errorMessage){ //ex: ('username', 1, 'admin', errorMassage)
        try {
            
            if(!validExtension.includes(attributeValue)){
                let message = "Format file are not allowed! Please use file format: "+validExtension.toString()+"!"
                await createObj(attributeName, message, errorMessage)
            }
            return 'ok'
        }
        catch (err) {
            logger.error(`[UNIQUE USER VALIDATION], msg: ${err}`)
        }
    }

    
}
module.exports = Controller.extensionFile
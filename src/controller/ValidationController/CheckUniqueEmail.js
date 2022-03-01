const logger = require('../../../utils/winston')
const getRequestId = require('../../../utils/request-id');
var requestId = getRequestId()
const checkUnique = require('../../service/UserService/checkUnique')
const createObj = require('./createObj')

class Controller {
    static async UniqueEmailValidation(attributeName, id, email, errorMessage){
        try {
            // var messagePerAttribute = []
            let existEmail = await checkUnique(email, id)
            if(existEmail){
                let message = "Email already exist! Please use another email!"
                await createObj(attributeName, message, errorMessage)
            }
            return 'ok'
        }
        catch (err) {
            logger.error(requestId+` [UNIQUE EMAIL VALIDATION], msg: ${err}`)
        }
    }

    
}
module.exports = Controller.UniqueEmailValidation
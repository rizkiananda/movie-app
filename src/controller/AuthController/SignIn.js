const { decrypt } = require('../../../utils/bcrypt')
const jwt = require('jsonwebtoken')
const findUser = require('../../service/UserService/findUser')
const logger = require('../../../utils/winston')
const getRequestId = require('../../../utils/request-id');
var requestId = getRequestId()

class controller {
    static signIn (req, res){
        let email = req.body.email
        let password = req.body.password
        var data = new Object()
        console.log(email, password)
        findUser(email)
        .then(user => {
            // if user not found
            if (!user) {
                logger.info(`[AUTH] ${req.headLog}, msg: Salah email atau password!|`+requestId)
                return res.status(400).send({ result: 'error', message: 'Salah email atau password!', data : {} })
            }
            else{
                const dbPassword = user.password
                const compare = decrypt(password, dbPassword)
                if (compare) {
                    const payload = {
                        id: user.id,
                    }

                    const token = jwt.sign({ data: payload }, 'ravelware')
                    data.token = token
                    data.userId = user.id;
                    data.name = user.name;
                    data.email = user.email;
                    data.phone = user.phone;
                    data.endSubsription = user.end_subscription;
                    data.privilege = user.privilege;
                    data.image = user.image ? "file/stream/type/user/document/"+user.image : null;
                    logger.info(requestId+` [AUTH] ${req.headLog}, msg: `+email+` Berhasil masuk!`)
                    res.send({ status: 'OK', message: "", data: data })
                } else {
                    logger.info(requestId+` [AUTH] ${req.headLog}, msg: Salah email atau password!`)
                    return res.status(400).send({ result: 'error', message: 'Salah email atau password!', data: {} })
                }
            }
        })
        .catch(err => {
            logger.error(requestId+` [AUTH] ${req.headLog}, msg: ${err}`)
            res.status(500).send({ result: 'error', message: 'Terjadi kesalahan! Silakan coba lagi atau hubungi vendor.', data: {} })
        })
    }
}

module.exports = controller.signIn
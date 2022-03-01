const jwt = require('jsonwebtoken')
const {model} = require('../../models')
const { Op } = require("sequelize")
const logger = require('../../utils/winston')
const getRequestId = require('../../utils/request-id');
var requestId = getRequestId()

const auth = async (req, res, next) => {
    req.headLog = req.headers['x-forwarded-for'] || req.connection.remoteAddress + ' ' + req.url + ', body: ' + JSON.stringify(req.body)
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'ravelware')
       
        const user = await model.users.findOne({ where : { id: decoded.data.id } })
        
        if (!user) {
            throw new Error()
        }
        else{
            // const company = await model.company.findOne({ where : { id: user.company_id } })
            req.token = token
            req.user = user
            // req.company = company
            next()
        }

    } catch (err) {
        logger.info(requestId+' [USER] ' + err + ', res: Anda belum login! Silakan login dahulu.')
        res.status(401).send({ result: 'error', message: 'Anda belum login! Silakan login dahulu.', data: {} })
    }
}

module.exports = auth
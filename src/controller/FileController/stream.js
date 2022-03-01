const logger = require('../../../utils/winston')
const getRequestId = require('../../../utils/request-id');
var requestId = getRequestId()
const path = require('path');
const fs = require('fs')

class Controller {
    static async showFile(req, res){
        try {
            let type = req.params.type //type is folder name
            let document = req.params.document
            var url = process.cwd() + '/document/'+type+'/'+document
            if(document != null){
                if (fs.existsSync(url)) {
                    const stream = fs.createReadStream(url)
                    stream.pipe(res)
                }
                else{
                    logger.error(requestId+` [PREVIEW FILE], msg: File tidak ditemukan!`)
                    res.status(500).send({ result: 'error', message: 'File tidak ditemukan!', data: {} })
                }
            }
            else{
                return res.status(400).send({ result: 'error', message: 'Tidak dapat kiriman document dari client!', data: {} })
            }
        } catch (error) {
            logger.error(requestId+` [PREVIEW FILE], msg: ${error}`)
            res.status(500).send({ result: 'error', message: 'Terjadi kesalahan! Silakan coba lagi atau hubungi vendor.', data: {} })
        }
    }
}

module.exports = Controller.showFile
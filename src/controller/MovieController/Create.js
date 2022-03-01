const createMovie = require('../../service/MovieService/create')
const updateFileDBUser = require('../../service/MovieService/Upload')
const moment = require('moment')
const logger = require('../../../utils/winston')
const uploadFile = require('../FileController/Upload')
const validateExtensionFile = require('../ValidationController/ExtensionFile')
const getRequestId = require('../../../utils/request-id');

class Controller {
    static async create(req, res){
        var requestId = getRequestId()
        try{
            var errorMessage = {}
            let name = req.body.name
            let description = req.body.description
            let category = req.body.category
            var image = null
            if(req.files){
                image = req.files.thumbnail
                let mimeType = image.mimetype.split('/')
                let extensionFile = mimeType[mimeType.length - 1]
                let validExtension = ['jpg', 'jpeg', 'png']
                await validateExtensionFile('image', validExtension, extensionFile, errorMessage)
            }
            if(Object.keys(errorMessage).length === 0){
                let createUserValue = await createMovie(name, description, category)
                let movieId = createUserValue ? createUserValue.id : null
                await uploadFile('movie', movieId, null, image, null)
                await updateFileDBUser(movieId, image.name)
                res.send({ status: 'OK', message: "Success create data movie", data: {} })
            }
            else{
                logger.info(requestId+` [CREATE MOVIE] ${req.headLog}, msg: `+JSON.stringify(errorMessage))
                return res.status(400).send({ result: 'error', error: errorMessage })
            }
        }
        catch(err){
            logger.error(requestId+` [CREATE MOVIE] msg: ${err}`)
            res.status(500).send({ result: 'error', message: 'Terjadi kesalahan! Silakan coba lagi atau hubungi vendor.', data: {} })
        }
        
    }
}

module.exports = Controller.create
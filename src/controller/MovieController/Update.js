const updateMovie = require('../../service/MovieService/update')
const detailMovie = require('../../service/MovieService/detail')
const updateFileDBMovie = require('../../service/MovieService/Upload')
const moment = require('moment')
const logger = require('../../../utils/winston')
const validateExtensionFile = require('../ValidationController/ExtensionFile')
const uploadImage = require('../FileController/Upload')
const getRequestId = require('../../../utils/request-id');

class Controller {
    static async update(req, res){
        var requestId = getRequestId()
        try{
            var errorMessage = {}
            var id = req.body.id
            let name = req.body.name
            let description = req.body.description
            let category = req.body.category
            var image = null
            var movie = detailMovie(id)
            var imageDB = movie.thumbnail

            if(req.files){
                image = req.files.thumbnail
                let mimeType = image.mimetype.split('/')
                let extensionFile = mimeType[mimeType.length - 1]
                let validExtension = ['jpg', 'jpeg', 'png']
                await validateExtensionFile('image', validExtension, extensionFile, errorMessage)
                imageDB = image.name
            }
            
            if(Object.keys(errorMessage).length === 0){
                await updateMovie(id, name, description, category)
                await uploadImage('movie', id, movie.thumbnail, image, null) //folder name, id movie, movie image db, file, status deleted image
                await updateFileDBMovie(id, imageDB)
                movie = await detailMovie(id)
                
                var data = new Object()
                data.movieId = movie.id;
                data.name = movie.name;
                data.description = movie.description;
                data.category = movie.category;
                data.thumbnail = movie.thumbnail ? "file/stream/type/movie/document/"+movie.thumbnail : null;
                res.send({ status: 'OK', message: "Success update data movie", data: data })
            }
            else{
                logger.info(requestId+` [UPDATE MOVIE] ${req.headLog}, msg: `+JSON.stringify(errorMessage))
                return res.status(400).send({ result: 'error', error: errorMessage })
            }
        }
        catch(err){
            logger.error(requestId+` [UPDATE MOVIE] ${req.headLog}, msg: ${err}`)
            res.status(500).send({ result: 'error', message: 'Terjadi kesalahan! Silakan coba lagi atau hubungi vendor.', data: {} })
        }
    }
}

module.exports = Controller.update
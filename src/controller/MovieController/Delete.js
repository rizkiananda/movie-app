const deleteMovie = require('../../service/MovieService/delete')
const moment = require('moment')
const logger = require('../../../utils/winston')
const getRequestId = require('../../../utils/request-id');

class Controller {
    static async delete(req, res){
        let movieId = req.params.movieId
        var requestId = getRequestId()
        try {
            deleteMovie(movieId)
            res.send({ status: 'OK', message: "Success delete data movie", data: {} })
        }
        catch (err) {
            logger.error(requestId+` [DELETE MOVIE] ${req.headLog}, msg: ${err}`)
            res.status(500).send({ result: 'error', message: 'Terjadi kesalahan! Silakan coba lagi atau hubungi vendor.', data: {} })
        }
    }
}
module.exports = Controller.delete
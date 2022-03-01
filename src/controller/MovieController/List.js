const listMovie = require('../../service/MovieService/list')
const moment = require('moment')
const logger= require('../../../utils/winston')
const getRequestId = require('../../../utils/request-id');
var requestId = getRequestId()

class Controller {
    static async list(req, res){
        let category = req.query.category
        let limit = req.query.limit
        let q = req.query.q
        var requestId = getRequestId()
        var data = []
        listMovie(category, limit, q)
        .then(async movies => {
            if(movies){
                for(const resultMovie of movies){
                    var userObj = new Object()
                    userObj.movieId = resultMovie.id;
                    userObj.name = resultMovie.name;
                    userObj.description = resultMovie.description;
                    userObj.category = resultMovie.category;
                    userObj.thumbnail = resultMovie.thumbnail ? "file/stream/type/movie/document/"+resultMovie.thumbnail : null;
                    data.push(userObj)
                }
            }
            res.send({ status: 'OK', message: "", data: data })
        })
        .catch(err => {
            logger.error(requestId+` [MOVIES] ${req.headLog}, msg: ${err}`)
            res.status(500).send({ result: 'error', message: 'Terjadi kesalahan! Silakan coba lagi atau hubungi vendor.', data: {} })
        })
    }
}

module.exports = Controller.list
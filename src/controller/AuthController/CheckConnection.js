

class controller {
    static checkConnectionFrontBack (req, res){
        return res.send('ok')
    }
}

module.exports = controller.checkConnectionFrontBack
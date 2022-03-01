const {model} = require('../../../models')
const {Database1} = model //ERP

class Service {
    static upload = async(id, thumbnail) => {
        try {
            const result = await model.movie.update({
                thumbnail: thumbnail,
            },{
                where: {
                    id: id
                }
            })

            return result
        }
        catch (err) {
            return err
        }
    }
}

module.exports = Service.upload
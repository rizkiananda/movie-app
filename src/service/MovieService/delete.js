const {model} = require('../../../models')
const {Database1} = model //ERP
const Sequelize = require('sequelize')
const { encrypt } = require('../../../utils/bcrypt')

class Service {
    static delete = async(id, t) => {
        try {
            await model.movie.destroy({
                where: {
                    id: id
                },
                force: true,
                transaction: t
            });
        }
        catch (err) {
            return err
        }
    }
}

module.exports = Service.delete
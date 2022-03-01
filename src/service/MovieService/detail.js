const {model} = require('../../../models')
const {Database1} = model //ERP
const Sequelize = require('sequelize')
const { encrypt } = require('../../../utils/bcrypt')

class Service {
    // get user by id with sequelize
    static detail = async (id) => {
        try {
            const result = await model.movie.findOne({
                where: {
                    id: id,
                },
                raw: true
            },
            {})

            return result
        }
        catch (err) {
            return err
        }
    }
}

module.exports = Service.detail
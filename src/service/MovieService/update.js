const {model} = require('../../../models')
const {Database1} = model //ERP
const Sequelize = require('sequelize')

class Service {
    //update data user with sequelize
    static update = async(id, name, description, category) => {
        try {
            const result = await model.movie.update({
                name: name,
                description: description,
                category: category
            },{
                where: {
                    id: id
                },
            })

            return result
        }
        catch (err) {
            return err
        }
    }
}

module.exports = Service.update
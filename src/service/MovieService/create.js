const {model} = require('../../../models')
const {Database1} = model //ERP
const Sequelize = require('sequelize')

class Service {
    // created data user with sequelize
    static create = async (name, description, category) => {
        try {
            console.log(name, description, category)
            const result = await model.movie.create({
                name: name,
                description: description,
                category: category
            })
            return result
        }
        catch (err) {
            return err
        }
    }
}

module.exports = Service.create
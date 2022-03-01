const {model} = require('../../../models')
const {Database1} = model //ERP
const Sequelize = require('sequelize')
const { encrypt } = require('../../../utils/bcrypt')

class Service {
    //get all data with sequelize
    // static list = async (category, limit, q) => {
    //     try {
    //         const result = await model.movie.findAll({
    //             raw: true
    //         })
    
    //         return result
    //     }
    //     catch (err) {
    //         return err
    //     }
    // }

    //get all data with query builder
    static list = async (category, limit, q) => {
        try {
            if(category != undefined){
                var result = await Database1.query(`SELECT * from movie where category='${category}'`);
            }
            else if(q != undefined && limit != undefined){
                var result = await Database1.query(`SELECT * from movie where name LIKE '%${q}%' LIMIT `+limit);
            }
            else if(limit != undefined){
                var result = await Database1.query(`SELECT * from movie LIMIT `+limit);
            }
            else if(q != undefined){
                var result = await Database1.query(`SELECT * from movie where name LIKE '%${q}%'`);
            }
            else if(category == undefined && q == undefined && limit == undefined){
                var result = await Database1.query(`SELECT * from movie`);
            }
            
            return result[0]
        }
        catch (err) {
            console.log('error ', err)
            return err
        }
    }
}

module.exports = Service.list
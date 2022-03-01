'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config');
var pjson = require('../package.json');
var projectName = pjson.name
let db = {};
// console.log(config)
const databases = Object.keys(config.model);

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

/** Add Databases**/
for(let i = 0; i < databases.length; ++i) {
  let database = databases[i];
  let dbPath = config.model[database];
  // console.log(database)
  db[database] = new Sequelize( dbPath.database, dbPath.username, dbPath.password, dbPath );
}

/**Add the Database Models**/
//Add models from database1 folder
fs
  .readdirSync(path.join(__dirname+'/database1'))
  .filter(file =>
      (file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js'))
  .forEach(file => {
      // const model = db.Database1.import(path.join(__dirname, '/database1', file)); //sequelize 5
      const model = require(path.join(__dirname, '/database1', file))(db.Database1, Sequelize.DataTypes) //sequelize 6
      db[model.name] = model;
  });


// Add models from database2 folder
// fs
//   .readdirSync(__dirname + '/database2')
//   .filter(file =>
//       (file.indexOf('.') !== 0) &&
//       (file !== basename) &&
//       (file.slice(-3) === '.js'))
//   .forEach(file => {
//       const model = db.Database2.import(path.join(__dirname + '/database2', file));
//       db[model.name] = model;
//   });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
      db[modelName].associate(db);
  }
});

// console.log(db, 'ulala')
db = {
  model: db
}
// console.log(db)
module.exports = db;

const logger = require('../utils/winston')

// rename this file into 'index.js'
const fs = require('fs')
const path = require('path');

if (fs.existsSync(path.resolve(process.cwd()+`/config/config.json`))) {
    logger.info(`[CONFIG] running config with file config.json`)
    var config = JSON.parse(fs.readFileSync(path.resolve(process.cwd()+`/config/config.json`), 'utf-8'))
}
else{
    logger.info(`[CONFIG] running config with require config`)
    var config = require('./config')
}

module.exports = config
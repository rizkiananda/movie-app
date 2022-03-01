const app = require('./src/app')
const logger = require('./utils/winston')
const moment = require('moment')
const config = require('./config')
const port = config.api_port

app.listen(port, () => {
    logger.info('[MAIN] Server is up on port ' + port)
})

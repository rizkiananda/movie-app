const express = require('express')
const router = new express.Router()
const LogController = require('../controller/LogController/GetInputLog')

router.post('/', LogController)

module.exports = router
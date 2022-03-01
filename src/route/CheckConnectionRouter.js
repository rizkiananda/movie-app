const express = require('express')
const router = new express.Router()
const checkConnectionFrontBack = require('../controller/AuthController/CheckConnection')

router.post('/', checkConnectionFrontBack)

module.exports = router
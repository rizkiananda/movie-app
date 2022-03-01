const express = require('express')
const router = new express.Router()
const streamFile = require('../controller/FileController/stream')

router.get('/stream/type/:type/document/:document', streamFile)

module.exports = router
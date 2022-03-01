const express = require('express')
const router = new express.Router()
const file = require('./FileRouter')
const movieRouter = require('./MovieRouter')

router.use('/file', file)
router.use('/api/movies', movieRouter)

module.exports = router
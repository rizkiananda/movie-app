const express = require('express')
const router = new express.Router()

const list = require('../controller/MovieController/List')
const create = require('../controller/MovieController/Create')
const update = require('../controller/MovieController/Update')
const remove = require('../controller/MovieController/Delete')

router.get('/', list)
router.post('/create', create)
router.post('/update', update)
router.delete('/delete/:movieId', remove)

module.exports = router
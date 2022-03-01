const express = require('express')
const router = new express.Router()
const signIn = require('../controller/AuthController/SignIn')

router.post('/', signIn)

module.exports = router
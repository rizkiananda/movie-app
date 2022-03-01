const express = require('express')
var cors = require('cors')
const router = require('./route')
const fileUpload = require('express-fileupload');

const app = express()
app.use(cors())
app.use(fileUpload());

// use parse json in express
app.use(express.json())
app.use(router)

module.exports = app
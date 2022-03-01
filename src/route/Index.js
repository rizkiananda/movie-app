const express = require('express')
const router = new express.Router()
// const authRouter = require('./AuthRouter')
// const userRouter = require('./UserRouter')
// const checkConnection = require('./CheckConnectionRouter')
// const log = require('./LogRouter')
// const websocket = require('./WebsocketRouter')

const file = require('./FileRouter')
const movieRouter = require('./MovieRouter')

// router.use('/check-connection', checkConnection)
// router.use('/sign-in', authRouter)
// router.use('/user', userRouter)
// router.use('/log', log)
// router.use('/websocket', websocket)

router.use('/file', file)
router.use('/api/movies', movieRouter)

module.exports = router
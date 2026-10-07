const fakemonRoutes = require('./routes/index.js')
const requestLogger = require('./middleware/requestLogger')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const express = require('express')
const {API_PREFIX} = require('./config/constants.js')
const path = require('path')

app = express()

function createApp(){
    app.use(express.static(path.join(__dirname, '..', 'public')))
    app.use((req, res, next) => { res.setHeader('X-Served-By', process.pid); next() })
    console.log("server pid:", process.pid)
    app.use(requestLogger)
    app.use(express.json({limit:'10kb'})) // because data structure or type was chosen the raw data could not be comprehended by the middleware
    app.use(API_PREFIX, fakemonRoutes)
    // express.json() reads the request stream, parses it onto the req.body

    // This is an industry standard pathway checking the health of the application! It is mandatory!
    // app.get('/boom',()=>{
    //     throw new Error("kaboom")
    // })
    app.use(notFound)
    app.use(errorHandler)

    return app
}

module.exports = createApp
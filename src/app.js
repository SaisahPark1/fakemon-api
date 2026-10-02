const fakemonRoutes = require('./routes/routes.js')
const { notFound, errorHandler, requestLogger, fakeAuth} = require('./middleware/middleware.js')
const express = require('express')
const {API_PREFIX} = require('./config/constants.js')
const Fakemon = require('./models/fakemon.model.js')

app = express()

const path = require('path')
app.use(express.static(path.join(__dirname, '..', 'public')))

function createApp(){
    app.use((req, res, next) => { res.setHeader('X-Served-By', process.pid); next() })
    console.log("server pid:", process.pid)
    app.use(requestLogger)
    app.use(fakeAuth)
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
const fakemonRoutes = require('./routes/routes.js')
const { notFound, errorHandler, requestLogger} = require('./middleware/middleware.js')
const express = require('express')

app = express()

function createApp(){
    app.use(requestLogger)
    app.use(express.json({limit:'10kb'})) // because data structure or type was chosen the raw data could not be comprehended by the middleware
    app.use('/api/v1', fakemonRoutes)
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
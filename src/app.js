const express = require('express')
const routes = require('./routes')
const healthRoutes = require('./routes/health.routes')
const requestLogger = require('./middleware/requestLogger')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const { API_PREFIX } = require('./config/constants')

/**
 * This will build the express application and start the base database connection and application
 * 
 * the order for middleware packet processing is:
 * logger -> bodyparser -> health -> API Routes -> 404 -> Error Handler
 */

const app = express()
// REMEMBER: ORDER MATTERS

app.use(requestLogger)
app.use(express.json({limit: '10kb'}))
app.use(express.urlencoded({extended: true, limit: '10kb'}))

// Routing for pathways
app.use('/health', healthRoutes)
app.use(API_PREFIX, routes)

// Routing for errors
app.use(notFound)
app.use(errorHandler)

module.exports = app
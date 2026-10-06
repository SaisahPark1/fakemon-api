'use strict'

const {isProduction} = require('../config/env.js')

/**
 * This will become a global error handler. Each error will have 4 parameters
 * 
 * Express ids error middleware by priority and then the 3 parameter function is created
 * as a regulr middleware and never invoked with an error
 * 
 * make sure:
 * eslint-disable-next-line no-unused-vars
 */

module.exports = function errorHandler(err, req, res, next){
    let statusCode = err.statusCode || 500
    let message = err.message || 'Internal Server Error'
    let details = err.details = err.details || null

    // This is in the case the ObjectJS is wrong in the path parameter - client error is not a server error
    if(err.name === 'CastError'){
        statusCode = 400
        message = `Invalid ${err.path}: ${err.value}`
    }

    // This in case the schema validation fails
    if(err.name == "ValidationError"){
        statusCode = 400
        message: "Valdiation Failed"
        details: Object.values(err.errors).map((error)=>({
            field: error.path,
            message: error.message
        }))
    }

    // This is in case the unique id they are trying to use is not unique and the index is violated
    if(err.code === 11000){
        statusCode = 409
        message = `Duplicate values for: ${Object.keys(err.keyValue || {}).join(', ')}`
    }

    // In case the JSON request structure is wrong
    if (err.type==='entity.parse.failed'){
        statusCode = 400
        message = 'Malformed JSON in request body'
    }

    // This is in case the body is larger than the configured size limit
    if(err.type === 'entity.too.large'){
        statusCode = 400
        message = 'Request body too large'
    }

    // If it is the server's fault :(
    if (statusCode >= 500) console.log('[error]', {message: err.message, stack: err.stack})

    res.status(statusCode).json({
        succes: false,
        error:{
            message,
            ...(details && details),
            // the err.stack shows/traces/exposes the file paths and dependency versions:
            // This is for development only and once production is true, they will no longer show secrets
            ...(!isProduction && statusCode >= 500 && {stack: err.stack})
        }
    })
}
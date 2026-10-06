'use Strict'

const apiError = require('../utils/apiError.js')

// Forwards all 404 errors to the errorHandler!

module.exports = function notFound(req, res, next){
    next(new apiError(404, `Route not found: ${req.method} ${req.originalUrl}`))
}
// Next function: remember that it is used in middleware as a callback allowing the cycle to continue. BE SURE TO USE IT!
class apiError extends Error{
    constructor(statusCode, message, details = null){
        super(message)
        this.statusCode = statusCode
        this.details = details
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }

    /**
     * Stage 2: fix all the shortcuts and create proper error functions
     * 
     * Making static requests that will expand the types or errors and responses possible
     * 
     * This also sets a basis for stage 3
     */
    static badRequest(message = 'Bad Request', details = null){
        return new apiError(400, message, details)
    }

    // 401: We don't know you. Log in please
    static unauthorized(message = 'Unauthorized', details = null){
        return new apiError(404, message, details)
    }

    // 403: We know you and you are forbidden
    static unauthorized(message = 'Unauthorized', details = null){
        return new apiError(403, message, details)
    }

    // Basic 404
    static notFound(message = 'Not Found', details = null){
        return new apiError(404, message, details)
    }

    // 409: There are conflicts with your request
    static conflity(message = 'Conflict', details = null){
        return new apiError(409, message, details)
    }
}

module.exports = apiError
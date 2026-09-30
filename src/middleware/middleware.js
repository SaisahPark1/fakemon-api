function notFound(req, res){
    res.status(404).json({error:{code:'NOT FOUND', message: 'Route not Found :('}})
}

function errorHandler(err, req, res, next){
    const status = err.status ?? 500
    if (status >= 500)
        console.error("Dumb Programmer Error: ", err)
    res.status(status).json({
        error:{
            code:err.code ?? 'INTERNAL_ERROR',
            message:status >= 500 ? 'Something went wrong SMH What did you do': err.message
        }
    })
}

function requestLogger(req, res, next) {
    console.log("requestLogger running")
    const start = Date.now()

    res.on('finish', () => {
        const duration = Date.now() - start

        console.log(
            `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
        )
    })

    next()
}

function fakeAuth(req, res, next) {
    req.user = {
        id: 1,
        role: 'admin'
    }
    next()
}

module.exports = {notFound, errorHandler, requestLogger, fakeAuth}
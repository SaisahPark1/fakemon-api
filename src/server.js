const {connectDatabase, disconnectDatabase} = require('./config/database.js')
const {port} = require('./config/env.js')
const app = require('./app.js')()

async function start(){
    await connectDatabase()
    const server = app
    if (!port) throw new Error('PORT is not set. Check your .env')
    server.listen(port,()=> console.log(`Listening on port: http://localhost:${port}`))

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use. Kill the old process.`)
            process.exit(1)
        }
        throw err
    })
}
start()

async function stop() {
    await disconnectDatabase()
}
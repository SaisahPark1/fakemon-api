const {connectDatabase, disconnectDatabase} = require('./config/database.js')
const {port} = require('./config/env.js')
const app = require('./app.js')()
const mock = require('../postman/MOCK_DATA.json')
const Fakemon = require('./models/fakemon.model.js')

async function start(){
    await connectDatabase()

    try {
        const result = await Fakemon.insertMany(mock, { ordered: false })
        console.log(`Inserted ${result.length}`)
    } catch (err) {
        console.error(err.message)
    }

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

/**
 * Stop will mean stop new connections let the running requests finish then close
 * Otherwise, every request in progress will fail
 */
const shutdown = (signal)=>{
    console.log(`\n${signal} recieved, shuttingdown`)

    const force = setTimeout(() => {
        console.error("FORCING EXIT AFTER 10s")
        process.exit(1)
    },10000)
    force.unref()

    server.close(async()=>{
        await disconnectDatabase()
        console.log("Shutdown Complete")
        process.exit(0)
    })

    process.on('SIGTERM', ()=> shutdown("SIGTERM"))
    process.on('SIGINT', ()=> shutdown("SIGINT"))
    // Significant Term and Significant Integer or Number
}
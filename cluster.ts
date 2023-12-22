import express from 'express'
import 'dotenv/config'
import cluster from 'cluster'
import os from 'os'
import userRouter from './routes/user'

const availableParallelism = os.availableParallelism()
let PORT = process.env.PORT ?? 5000
cluster.schedulingPolicy = cluster.SCHED_RR

if (cluster.isPrimary) {
    for (let i = 0; i < availableParallelism; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker) => {
        cluster.fork() // Redeploy a new worker when a worker dies
    })
}
else {
    const app = express()
    app.use(express.json())


    app.get('/', async (req, res) => {
        let count = 1
        while (count < 1e10){
            count++
        }
        res.send(`Up & Working!! ${process.pid}`)
    })

    app.use('/api/users', userRouter)

    // Middleware for not found routes
    app.use((req, res) => {
        res.status(404).json({
            error: {
                name: 'NotFound',
                message: 'No route found'
            }
        })
    })

    app.listen(PORT, () => {
        console.log(`Express Server Started on Port ${PORT}`)
    })
}

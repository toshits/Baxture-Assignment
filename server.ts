import express from 'express'
import 'dotenv/config'
import { createClient } from 'redis'
import cluster from 'cluster'
import os from 'os'
import userRouter from './routes/user'
export const client = createClient({ url: process.env.REDIS_URL })

let PORT = process.env.PORT ?? 5000

if (process.argv.includes('--cluster') && cluster.isPrimary) {
    const availableParallelism = os.availableParallelism()
    cluster.schedulingPolicy = cluster.SCHED_RR
    for (let i = 0; i < availableParallelism; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker) => {
        cluster.fork() // Redeploy a new worker when old worker dies
    })
}
else {
    const app = express()
    app.use(express.json())


    app.get('/', async (req, res) => {
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
        client.connect()
        console.log(`Express Server Started on Port ${PORT}`)
    })
}
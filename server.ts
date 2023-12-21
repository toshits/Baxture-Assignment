import express from 'express'
import 'dotenv/config'

let PORT = process.env.PORT ?? 5000

const app = express()
app.use(express.json())


app.get('/', async (req, res)=>{
    res.send('Up & Working!!')
})


app.listen(PORT, ()=>{
    console.log(`Express Server Started on Port ${PORT}`)
})
import express from 'express'
import crypto from 'crypto'

const router = express.Router()

export type User = {
    id: string,
    username: string,
    age: number,
    hobbies: string[]
}

export type Users = User[]

let users: Users = [] // in-memory database to store users

// Endpoint for fetching all users
router.get('/', async (req, res) => {
    try {
        res.json(users)

    } catch (error) {
        res.status(500).json({
            error: {
                name: 'InternalServerError',
                message: 'Please try after some time'
            }
        })
    }
})

// Endpoint for fetching user with a specific ID
router.get('/:userId', async (req, res) => {
    try {
        let { userId } = req.params
        if (userId == null || typeof userId !== 'string') {
            res.status(400).json({
                error: {
                    name: 'BadRequest',
                    message: 'Provide a valid user id'
                }
            })
            return
        }

        const user = users.find((user) => user.id == userId)
        if (!user) {
            res.status(404).json({
                error: {
                    name: 'NotFound',
                    message: 'No user found'
                }
            })
            return
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            error: {
                name: 'InternalServerError',
                message: 'Please try after some time'
            }
        })
    }
})

// Endpoint for adding new user
router.post('/', async (req, res) => {
    try {
        const { username, age, hobbies } = req.body

        if (username == null || age == null || hobbies == null) {
            res.status(400).json({
                error: {
                    name: 'BadRequest',
                    message: 'Required fields are not provided'
                }
            })
            return
        }

        let user: User = {
            id: crypto.randomUUID(),
            username,
            age,
            hobbies
        }

        users.push(user) // Adding to DB here
        res.status(201).json(user)

    } catch (error) {
        res.status(500).json({
            error: {
                name: 'InternalServerError',
                message: 'Please try after some time'
            }
        })
    }






})

router.put('/:userId', async (req, res) => {
    try {
        const { userId } = req.params
        const { username, age, hobbies } = req.body

        if (userId == null || typeof userId !== 'string') {
            res.status(400).json({
                error: {
                    name: 'BadRequest',
                    message: 'Provide a valid user id'
                }
            })
            return
        }

        if (username == null || age == null || hobbies == null) {
            res.status(400).json({
                error: {
                    name: 'BadRequest',
                    message: 'Required fields are not provided'
                }
            })
            return
        }

        const user = users.find((user) => user.id == userId)
        if (!user) {
            res.status(404).json({
                error: {
                    name: 'NotFound',
                    message: 'No user found'
                }
            })
            return
        }

        user.username = username
        user.age = age
        user.hobbies = hobbies

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            error: {
                name: 'InternalServerError',
                message: 'Please try after some time'
            }
        })
    }
})

export default router
import { client } from "../server"

export type User = {
    id: string,
    username: string,
    age: number,
    hobbies: string[]
}

export type Users = User[]

export const getAllUsers = async (): Promise<Users> => {
    try {
        const usersString = await client.get('users')
        if (!usersString) return []
        else {
            return JSON.parse(usersString)
        }
    } catch (error) {
        await client.set('users', JSON.stringify([]))
        return []
    }
}

export const addNewUser = async (user: User): Promise<User> => {
    try {
        const usersString = await client.get('users')
        if (!usersString) {
            await client.set('users', JSON.stringify([user]))
            return user
        }
        else {
            let users: Users = JSON.parse(usersString)
            users.push(user)
            await client.set('users', JSON.stringify(users))
            return user
        }
    } catch (error) {
        await client.set('users', JSON.stringify([user]))
        return user
    }
}

export const updateUsers = async (users: Users): Promise<Users|null> =>{
    try {
        await client.set('users', JSON.stringify(users))
        return users
    } catch (error) {
        return null
    }
}
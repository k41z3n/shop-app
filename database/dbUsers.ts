import { db } from "."
import { User } from "../models"
import bcrypt from 'bcryptjs';

export const checkUserMailAndPassword = async (email: string, password: string) => {
    await db.connect()
    const user = await User.findOne({email})
    await db.disconnect()

    if (!user) {
        return null
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return null
    }


    const { name, role, _id } = user
    
    return {
        _id,
        name,
        role,
        email:email.toLowerCase()
    }
}

export const oAuthDBUser = async (oAuthEmail: string, oAuthName: string) => {
    
    await db.connect()
    const user = await User.findOne({email:oAuthEmail})
    
    if (user) {
        await db.disconnect()
        const { name, role, _id ,email} = user
        return { name, role, _id, email }
    } 
    
    const newUser = new User({ email: oAuthEmail, name: oAuthName, password: '@', role: 'client' })
    await newUser.save()
    await db.disconnect()

    const { name, role, _id, email } = newUser
    return { name, role, _id, email } 
}
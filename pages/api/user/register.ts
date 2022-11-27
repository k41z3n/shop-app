import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
import { db } from "../../../database";
import { User } from "../../../models";
import { jwt, validations } from "../../../utils";

type Data =
    | { message: string; }
    | {
        token: string,
        user: {
            email:string
            name:string
            role:string
        }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return registerUser(req,res)
    
        default:
            res.status(400).json({
                message:'Bad request'
            })
    }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', email = '', password = '' } = req.body as { name: string, email: string, password: string }
    
    if (password.length < 6) {
        return res.status(400).json({message:'Password length > 6 '})
    }
    
    if (name.length < 3) {
        return res.status(400).json({message:'Name length > 2 '})
    }

    if (!validations.isValidEmail(email)) {
        return res.status(400).json({message:'Email invalido'})
    }
    
    await db.connect()

    const user = await User.findOne({ email })
    
    if (user) {
        await db.disconnect()
        return res.status(400).json({message:'email already register'})
    }
    
    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        role:'client',
        name
    })
    
    try {
        await newUser.save({ validateBeforeSave: true })  
        await db.disconnect()
        
    } catch (error) {
        await db.disconnect()
        return res.status(500).json({message:'Error server!!!'})
    }
 
    const { id, role} = newUser

    const token = jwt.singToken(id, email)
    
    return  res.status(200).json({
        token,
        user:{email,role,name}
    })

}
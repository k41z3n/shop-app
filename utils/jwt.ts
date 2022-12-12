import jwt from 'jsonwebtoken'
import {  jwtVerify, type JWTPayload } from 'jose';

export const singToken = (id:string, email:string) => {
    if (!process.env.SECRET_JWT)
        throw new Error("secret jws is required");
        
    return jwt.sign(
        {id, email},
        process.env.SECRET_JWT,
        {
            expiresIn:'30d'
        }
    )
}


export const isValidToken = (token: string): Promise<string> => {
    
    if (!process.env.SECRET_JWT)
        throw new Error("secret jws is required");
        
    if(token.length <= 10)
        throw new Error("is not jwt token");
    
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(
                token,
                process.env.SECRET_JWT || '',
                (err, payload) => { 
                    if (err) return reject('Invalid token')
                    
                    const { _id } = payload as {_id:string}
                    
                    resolve(_id)
                })
        } catch (error) {
            reject(`ErrorJwtVerifyr@${error}`)           
        }
    })
        
    
}

export const joseIsValidToken = async(token: string): Promise<boolean> => {
    const {payload} = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_JWT || ''));
    
    return payload && false
}
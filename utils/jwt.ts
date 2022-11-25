import jwt from 'jsonwebtoken'

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
    
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(
                token,
                process.env.SECRET_JWT || '',
                (err, payload) => { 
                    if (err) return reject('Invalid token')
                    
                    const { _id } = payload as {_id:string}
                    
                    return _id
                })
        } catch (error) {
            reject(`ErrorJwtVerifyr@${error}`)           
        }
    })
        
    
}
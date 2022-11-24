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
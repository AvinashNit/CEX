import jwt, { type JwtPayload } from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET as string || "secret";

export function generateToken( id: string )
{
    return jwt.sign({id} ,SECRET);
}



export  function verifyToken( token: string)
{
    const decoded  =   jwt.verify(token, SECRET) as JwtPayload;
    
    return decoded.id;
}
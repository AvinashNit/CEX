import jwt, { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";

configDotenv();


export function generateToken( userId : string)
{
    return jwt.sign( { userId}, process.env.JWT_SECRET as string | "secret")
}


export function verifyToken( token : string  )
{
     return  jwt.verify( token , process.env.JWT_SECRET as string | "secret") as JwtPayload
}


export async function hashPassword( password: string)
{
    return await bcrypt.hash( password, 16);
}


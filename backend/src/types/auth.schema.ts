
import { z } from "zod";



const authSchema =  z.object({
    email: z.email().trim(),
    password: z.string().min(1, "password is required")
})


export  { authSchema }
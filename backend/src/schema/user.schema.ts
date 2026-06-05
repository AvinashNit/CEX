import z from "zod";

const userSchema = z.object({
    email: z.email({message :"Invalid email"}),
    password:z.string().min(8,{message: "password must be at least 8 characters"})
})

type User = z.infer< typeof userSchema>

export {userSchema , type User}
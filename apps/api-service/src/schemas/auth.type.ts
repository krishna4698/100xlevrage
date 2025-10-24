import {email, z} from "zod"

export const registerschema= z.object({
   email: z.email(),
   password:z.string().min(6)

})
export const loginschema =z.object({
   email:z.email(),
   password:z.string()
})
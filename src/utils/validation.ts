import { z } from 'zod'

export const emailSchema = z.object({
    email: z.string().email(),
})

export const loginSchema = emailSchema.extend({
    password: z.string().min(4).max(12),
})

export const signUpSchema = loginSchema.extend({
    name: z.string(),
})

export type ILogin = z.infer<typeof loginSchema>
export type ISignUp = z.infer<typeof signUpSchema>
export type IEmail = z.infer<typeof emailSchema>

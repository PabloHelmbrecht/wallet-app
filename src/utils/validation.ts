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

export const accountCategorySchema = z.enum([
    'general',
    'cash',
    'current account',
    'credit card',
    'account with overdraft',
    'saving account',
    'bonus',
    'insurance',
    'investment',
    'loan',
    'mortgage',
])

export const accountingTypeSchema = z.enum(['asset', 'liability','mixed'])

export const hexColorSchema = z.string().regex(new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$'))

export type ILogin = z.infer<typeof loginSchema>
export type ISignUp = z.infer<typeof signUpSchema>
export type IEmail = z.infer<typeof emailSchema>
export type IAccountCategory = z.infer<typeof accountCategorySchema>
export type IAccountingType = z.infer<typeof accountingTypeSchema>
export type IHexColor = z.infer<typeof hexColorSchema>

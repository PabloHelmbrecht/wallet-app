import { z } from 'zod'

//* ------------------------------------------- LOGIN SCHEMAS -------------------------------------------

export const emailSchema = z.object({
    email: z.string().email(),
})
export type IEmail = z.infer<typeof emailSchema>


export const loginSchema = emailSchema.extend({
    password: z.string().min(4).max(12),
})
export type ILogin = z.infer<typeof loginSchema>


export const signUpSchema = loginSchema.extend({
    name: z.string(),
})
export type ISignUp = z.infer<typeof signUpSchema>




//* ------------------------------------------- MISCELLANEOUS SCHEMAS -------------------------------------------

export const hexColorSchema = z.string().regex(new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$'))
export type IHexColor = z.infer<typeof hexColorSchema>


export const currencySchema = z.enum([
    'ARS',
    'AUD',
    'BOB',
    'BRL',
    'CAD',
    'CLP',
    'COP',
    'EUR',
    'GBP',
    'GTQ',
    'HKD',
    'HNL',
    'ILS',
    'INR',
    'JPY',
    'KRW',
    'MXN',
    'PAB',
    'PEN',
    'PLN',
    'PYG',
    'SVC',
    'USD',
    'UYU',
])
export type ICurrency = z.infer<typeof currencySchema>




//* ------------------------------------------- ACCOUNTS SCHEMAS -------------------------------------------

export const accountCategoryNameSchema = z.enum([
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
export type IAccountCategoryName = z.infer<typeof accountCategoryNameSchema>


export const dateFrequencySquema = z.enum(['day', 'week', 'month', 'year'])
export type IDateFrequency = z.infer<typeof dateFrequencySquema>


export const accountingTypeSchema = z.enum(['asset', 'liability', 'mixed'])
export type IAccountingType = z.infer<typeof accountingTypeSchema>


export const seriesDataSchema = z.object({ x: z.date(), y: z.number() })
export type ISeriesData = z.infer<typeof seriesDataSchema>


export const accountCategorySchema = z.object({
    name: accountCategoryNameSchema,
    data: z.array(seriesDataSchema),
    color: hexColorSchema,
    accountType: accountingTypeSchema,
    total: z.number(),
})
export type IAccountCategory = z.infer<typeof accountCategorySchema>


export const accountSchema = z.object({
    id: z.number(),
    category: accountCategoryNameSchema,
    data: z.array(seriesDataSchema),
    name: z.string(),
    bank: z.string(),
    image: z.string().url(),
    total: z.number(),
})
export type IAccount = z.infer<typeof accountSchema>




//* ------------------------------------------- TRANSACTIONS SCHEMAS -------------------------------------------
export const transactionSchema = z.object({
    amount: z.number(),
    description: z.string().optional(),
    categoryId: z.string(),
    bookingDate: z.date().optional(),
    paymentDate: z.date().optional(),
    financialAccountId: z.string(),
    transferAccountId: z.string().optional(),
    currency: currencySchema,
    beneficiaryId: z.string().optional(),
    budgetId: z.string().optional(),
    sourceId: z.string().optional(),
    tags: z.array(z.string()).optional(),
})
export type ITransaction = z.infer<typeof transactionSchema>




//* ------------------------------------------- CONFIG ATOM SCHEMAS -------------------------------------------
export const configAtomSchema = z.object({
    currency: currencySchema,
    presetDateRange: z.object({ start: z.date(), end: z.date() }),
})
export type IConfigAtom = z.infer<typeof configAtomSchema>


export const datePickerViewAtomSchema = z.enum(['presets', 'ranges', 'months', 'years'])
export type IDatePickerViewAtom = z.infer<typeof datePickerViewAtomSchema>


export const dateAtomSchema = z.object({
    start: z.date(),
    end: z.date(),
})
export type IDateAtom = z.infer<typeof dateAtomSchema>


export const sideMenuAtomSchema = z.boolean()
export type ISideMenuAtom = z.infer<typeof sideMenuAtomSchema>


export const chartDateAtomSchema = z.enum(['1M', '3M', '6M', '1Y', 'ALL'])
export type IChartDateAtom = z.infer<typeof chartDateAtomSchema>
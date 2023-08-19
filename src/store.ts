//Jotai
import { atom } from 'jotai'

//Zod
import z from 'zod'

//Moment Js
import moment from '~/lib/moment'

//Schemas
export const datePickerViewAtomSchema = z.enum(['presets', 'ranges', 'months', 'years'])
export const dateAtomSchema = z.object({
    start: z.date(),
    end: z.date(),
})
export const sideMenuAtomSchema = z.boolean()
export const configAtomSchema = z.object({
    currency: z.enum([
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
    ]),
    presetDateRange: z.object({ start: z.date(), end: z.date() }),
})
export const chartDateAtomSchema = z.enum(['1M', '3M', '6M', '1Y', 'ALL'])

//Types
export type IDatePickerViewAtom = z.infer<typeof datePickerViewAtomSchema>
export type IDateAtom = z.infer<typeof dateAtomSchema>
export type ISideMenuAtom = z.infer<typeof sideMenuAtomSchema>
export type IConfigAtom = z.infer<typeof configAtomSchema>
export type IChartDateAtom = z.infer<typeof chartDateAtomSchema>

//Atoms
export const datePickerViewAtom = atom(datePickerViewAtomSchema.parse('ranges'))
export const dateAtom = atom(
    dateAtomSchema.parse({
        start: new Date(),
        end: new Date(),
    }),
)
export const sideMenuAtom = atom(sideMenuAtomSchema.parse(true))
export const configAtom = atom(
    configAtomSchema.parse({
        currency: 'ARS',
        presetDateRange: { start: moment().subtract(30, 'days').toDate(), end: moment().toDate() },
    }),
)
export const chartDateAtom = atom(chartDateAtomSchema.parse('1Y'))

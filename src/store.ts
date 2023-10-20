//Jotai
import { atom } from 'jotai'

//Zod
import z from 'zod'

//Moment Js
import moment from '~/lib/moment'

//Schemas
import { datePickerViewAtomSchema, dateAtomSchema, sideMenuAtomSchema, configAtomSchema, chartDateAtomSchema } from './utils/validation'



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

//Jotai
import { atom } from 'jotai'

//Zod
import z from 'zod'

//Schemas
export const datePickerViewAtomSchema = z.enum(['presets', 'ranges', 'months', 'years'])
export const dateAtomSchema = z.object({
    start: z.date(),
    end: z.date(),
})
export const sideMenuAtomSchema = z.boolean()

//Types
export type IDatePickerViewAtom = z.infer<typeof datePickerViewAtomSchema>
export type IDateAtom = z.infer<typeof dateAtomSchema>
export type ISideMenuAtom = z.infer<typeof sideMenuAtomSchema>

//Atoms
export const dateAtom = atom(
    dateAtomSchema.parse({
        start: new Date(),
        end: new Date(),
    }),
)

export const datePickerViewAtom = atom(datePickerViewAtomSchema.parse('ranges'))

export const sideMenuAtom = atom(sideMenuAtomSchema.parse(true))

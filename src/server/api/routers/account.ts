/* eslint-disable @typescript-eslint/no-unsafe-member-access */
//Zod
import { z } from 'zod'

//TRPc
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

//Moment Js
import moment from '~/lib/moment'

//Custom Validations
import { type IAccountCategory, type IHexColor } from '~/utils/validation'


export const accountRouter = createTRPCRouter({
    getAll: protectedProcedure.input(z.object({ frequency: z.enum(['days','weeks','months','years']),startDate:z.date().optional(),endDate:z.date().optional() })).query(({ input }) => {
        
        type IAccountSummary = {
            accounts: {name: string, category: IAccountCategory, color: IHexColor }[],
            data:{date: Date, series: {[account:string]: number}}[]
        }
        
        
        const response: IAccountSummary = {
            accounts: [
                {name: 'Efectivo', category: 'cash',color: '#F94144'    },
                {name: 'Tarjeta de Débito', category: 'credit card',color: '#F3722C' },
                {name: 'préstamo', category: 'loan',color: '#F9C74F'},

            ],
            data: [
                {date: moment().subtract(11,'month').toDate(), series: {'Efectivo':Math.round(Math.random()*100)} },
                {date: moment().subtract(10,'month').toDate(), series: {'Efectivo':Math.round(Math.random()*100)} },
                {date: moment().subtract(9,'month').toDate(), series: {'Efectivo':Math.round(Math.random()*100)} },
                {date: moment().subtract(8,'month').toDate(), series: {'Efectivo':Math.round(Math.random()*100)} },
                {date: moment().subtract(7,'month').toDate(), series: {'Efectivo':Math.round(Math.random()*100)} },
                {date: moment().subtract(6,'month').toDate(), series: {'Efectivo':Math.round(Math.random()*100)} },
                {date: moment().subtract(5,'month').toDate(), series: {'Efectivo':Math.round(Math.random()*100)} },
                {date: moment().subtract(4,'month').toDate(), series: {'Efectivo':Math.round(Math.random()*100)} },
                {date: moment().subtract(3,'month').toDate(), series: {'Efectivo':Math.round(Math.random()*100)} },
                {date: moment().subtract(2,'month').toDate(), series: {'Efectivo':Math.round(Math.random()*100)} },
                {date: moment().subtract(1,'month').toDate(), series: {'Efectivo':Math.round(Math.random()*100)} },
                {date: moment().toDate(), series: {'Efectivo':Math.round(Math.random()*100)} },

    
            ]
        }
        
    
        
        return (response)
    }),

})

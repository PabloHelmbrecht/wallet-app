/* eslint-disable @typescript-eslint/no-unsafe-member-access */
//Zod
import { z } from 'zod'

//TRPc
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

//moment.js
import moment from '~/lib/moment'

//Custom Validations
import type { IAccountCategory, IAccount } from '~/utils/validation'

const dates: Date[] = []

for (let index = 0; index < 100; index++) {
    dates.push(moment().subtract(index, 'days').toDate())
}

export const accountRouter = createTRPCRouter({
    getAccountCategories: protectedProcedure.query(() => {
        let accountCategories: IAccountCategory[] = [
            {
                name: 'cash',
                data: dates.map((x) => ({ x, y: Math.round(Math.random() * 100) })),
                color: '#F94144',
                accountType: 'asset',
                total: 0,
            },
            {
                name: 'current account',
                data: dates.map((x) => ({ x, y: Math.round(Math.random() * 100) })),
                color: '#F3722C',
                accountType: 'liability',
                total: 0,
            },
            {
                name: 'loan',
                data: dates.map((x) => ({ x, y: Math.round(Math.random() * 100) })),
                color: '#F9C74F',
                accountType: 'mixed',
                total: 0,
            },
        ]

        accountCategories = accountCategories?.map((account) => ({
            ...account,
            total: account.data.reduce((sum: number, value) => sum + value.y, 0),
        }))

        return accountCategories
    }),

    getAccounts: protectedProcedure.query(() => {
        const accountData: IAccount[] = [
            {
                id: 1,
                category: 'cash',
                name: 'Cuenta Pablo',
                bank: 'Galicia',
                image: 'https://images.unsplash.com/photo-1661904708589-2e20885a3297?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80',
                data: dates.map((x) => ({ x, y: Math.round(Math.random() * 100) })),
                total: 500,
            },
            {
                id: 2,
                category: 'current account',
                name: 'Cuenta Pablo',
                bank: 'Galicia',
                image: 'https://images.unsplash.com/photo-1661904708589-2e20885a3297?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80',
                data: dates.map((x) => ({ x, y: Math.round(Math.random() * 100) })),
                total: 500,
            },
            {
                id: 3,
                category: 'current account',
                name: 'Cuenta Pablo',
                bank: 'Galicia',
                image: 'https://images.unsplash.com/photo-1661904708589-2e20885a3297?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80',
                data: dates.map((x) => ({ x, y: Math.round(Math.random() * 100) })),
                total: 500,
            },
            {
                id: 4,
                category: 'loan',
                name: 'Cuenta Pablo',
                bank: 'Galicia',
                image: 'https://images.unsplash.com/photo-1661904708589-2e20885a3297?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80',
                data: dates.map((x) => ({ x, y: Math.round(Math.random() * 100) })),
                total: 500,
            },
        ]

        return accountData
    }),
})

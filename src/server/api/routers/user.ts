import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { hash } from 'argon2'
import { signUpSchema } from '~/utils/validation'
import { TRPCError } from '@trpc/server'

export const userRouter = createTRPCRouter({
    signup: publicProcedure.input(signUpSchema).query(async ({ input, ctx }) => {
        const { name, email, password } = input

        const exists = await ctx.prisma.user.findFirst({
            where: { email },
        })

        if (exists) {
            throw new TRPCError({
                code: 'CONFLICT',
                message: 'User already exists.',
            })
        }

        const hashedPassword = await hash(password)

        const result = await ctx.prisma.user.create({
            data: { name, email, password: hashedPassword },
        })

        return {
            status: 201,
            message: 'Account created successfully',
            result: result.email,
        }
    }),
})

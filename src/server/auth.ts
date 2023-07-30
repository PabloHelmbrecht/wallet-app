import { type GetServerSidePropsContext } from 'next'
import { getServerSession, type NextAuthOptions, type DefaultSession } from 'next-auth'
import { env } from "~/env.mjs";
import { prisma } from '~/server/db'


//Schemas
import { loginSchema } from '~/utils/validation'
import { verify } from 'argon2'



//Providers
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google";


//Adapters
import { PrismaAdapter } from '@next-auth/prisma-adapter'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string
            // ...other properties
            // role: UserRole;
        } & DefaultSession['user']
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    callbacks: {
        session: ({ session, user }) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
            },
        }),
    },
    adapter: PrismaAdapter(prisma),
    
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
          }),

    CredentialsProvider({
        name: "credentials",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "jsmith@gmail.com",
          },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          const creds = await loginSchema.parseAsync(credentials);
  
          const user = await prisma.user.findFirst({
            where: { email: creds.email },
          });
  
          if (!user) {
            return null;
          }
  
          const isValidPassword = await verify(String(user.password), creds.password);
  
          if (!isValidPassword) {
            return null;
          }
  
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        },
      }),
    ],
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext['req']
    res: GetServerSidePropsContext['res']
}) => {
    return getServerSession(ctx.req, ctx.res, authOptions)
}

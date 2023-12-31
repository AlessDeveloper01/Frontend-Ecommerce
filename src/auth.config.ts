import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';


export const authConfig: NextAuthConfig = {
  pages: {
        signIn: '/auth/login',
      newUser: '/auth/new-account',
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.data = user;
      }

      return token;
    },

    session: ({ session, token, user }) => {
      session.user = token.data as any;
      return session;
     }

    },

    providers: [
    Credentials({
        /**
         * Authorizes the user with the provided credentials.
         * 
         * @param credentials - The user's credentials.
         * @returns A promise that resolves to the parsed credentials if they are valid, otherwise an error.
         */
        async authorize(credentials) {
            const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);
            
            if (!parsedCredentials.success) {
                return null;
            }

            const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
            
        if (!user) return null;
        if (!bcryptjs.compareSync(password, user.password)) {
          return null;
        }

        // Usuario sin contraseña
        const { password: _, ...rest } = user;

            console.log('rest', rest);
            return rest;
      },
    }),
    ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
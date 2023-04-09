import NextAuth, { type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUserSchema } from "../../../schema/user.schema";
import { compare } from "bcrypt";
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        const creds = await loginUserSchema.parseAsync(credentials);
        const user = await prisma.user.findFirst({
          where: {
            email: creds.email,
          },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await compare(creds.password, user.password);
        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // token = user;
        token.user = user;
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = token.user as User;
      }
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

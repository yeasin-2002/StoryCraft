import prisma from "@/prisma";
import bcrypt from "bcrypt";

import NextAuth, { AuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { connectDB } from "@/helpers";
import { verifyUserCredentials } from "@/helpers/verifyUserDetails";
import { Env } from "@/utils";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: Env.GITHUB_ID,
      clientSecret: Env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: Env.GOOGLE_ID,
      clientSecret: Env.GOOGLE_SECRET,
    }),
    credentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "write your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "write your password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        try {
          await connectDB();
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });
          if (!user) {
            return null;
          }
          if (!user.password) {
            return null;
          }
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            return null;
          }

          return { ...user, id: user.id };
        } catch (error: any) {
          return null;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  secret: Env.NEXT_AUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async signIn({ account, user, profile }) {
      if (account?.provider === "github" || account?.provider === "google") {
        const newUser = await verifyUserCredentials(user);
        if (typeof newUser !== null) {
          user.id = newUser?.id as string;
          if (profile && profile.sub) {
            profile.sub = newUser?.id as string;
          }
        }
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


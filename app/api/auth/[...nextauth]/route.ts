import { Env } from "@/utils";
import NextAuth, { AuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

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
        password: { label: "password", type: "password" },
      },
      authorize({ credentials }, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        //  try catch
      },
    }),
  ],
  secret: Env.NEXT_AUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

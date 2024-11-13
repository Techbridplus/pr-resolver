import NextAuth, { User } from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import client from "@/lib/mongodb"
import GitHub from "next-auth/providers/github"
import { LoginSchema } from "./schemas"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail } from "./data/user"
import bcrypt from "bcrypt"
declare module "next-auth" {
  interface User {
    _id?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET_1,
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
              const { email, password } = validatedFields.data;
              const user = await getUserByEmail(email);
              if (!user || !user.password ) return null;
              
              const passwordMatch = await bcrypt.compare(password, user.password);

              if (passwordMatch) {
                return {
                  _id: user._id?.toString(),
                  email: user.email,
                  name: user.name,
                } as User;
              }
            }
          return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string

        token.email = user.email;
        token.name = user.name;

        
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id as string | undefined;
        session.user.email = token.email as string;
        session.user.name = token.name;
      }
      return session;
    },
  }
})

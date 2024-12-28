import NextAuth, { User } from "next-auth"
import client from "@/lib/mongodb"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { LoginSchema } from "./schemas"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail, getUserById,updateUserAccount } from "./data/user"
import UserModel from "./model/User"
import bcrypt from 'bcryptjs';
import { MongoDBAdapter } from "@auth/mongodb-adapter"


// import { updateUserAccount } from "./data/user";
declare module "next-auth" {
  interface User {
    _id?: string;
    role?: "admin" | "user";
    username?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt",
    maxAge:  20,
  },
  // secret: process.env.AUTH_SECRET_1,
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
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
    async signIn({ account, profile, user }) {
      try{
        if(user.email){
          const existingUser = await getUserByEmail(user.email); 
          if (existingUser && account) {
            if (existingUser.githubId && account.provider === "github") {
              throw new Error("This GitHub account is already associated with another user");
            }
            if (existingUser.accessToken && account.provider === "google") {
              throw new Error("This Google account is already associated with another user");
            }
          }
        }
        return true;
      } catch (error) {
        console.log("Error in signIn callback",error);
        throw error;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user._id;
      }
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
    async session({ session, token }) {

      if (token.sub && session.user) {
        session.user.id = token.sub;
       
      }

      if(token.role && session.user) {
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },
  }
});

          

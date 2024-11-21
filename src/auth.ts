import NextAuth, { DefaultSession, User } from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import client from "@/lib/mongodb"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { LoginSchema } from "./schemas"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail, getUserById,updateUserAccount } from "./data/user"
import UserModel from "./model/User"
import bcrypt from 'bcryptjs';
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
  events: {
    async linkAccount({ user, account, profile }) {
      console.log("event is happening .. ");  
      const existingUser = await getUserByEmail(profile.email || "");
      if (existingUser && existingUser._id !== user._id) {
        console.log("Email is already exist .. ")
        throw new Error("This email is already associated with another account");
      } else {
        if (account.id) {
          // Ensure username is not null
          const username = profile.username || `user_${user._id}`;
          if (user._id) {
            await updateUserAccount(user._id, {
                email: profile.email,
                username: username,
            });
          } else {
            throw new Error("User ID is undefined");
          }
        }
      }
    },
  },

  callbacks: {
    async signIn({ account, profile, user }) {
      const email = profile?.email;

      // Check if a user with the same email already exists
      if (!email) {
        throw new Error("Email is undefined");
      }
      const existingUser = await getUserByEmail(email);
      console.log("account already exist...")

      if(existingUser && account) {
        if (existingUser.githubId && account.provider === "github") {
          throw new Error("This account is already associated with another user");
        }
        if (existingUser.accessToken && account.provider === "google") {
          throw new Error("This account is already associated with another user");
        }
        return  false;
      }

      // Allow sign-in for new users
      return true;
    },
    async jwt({ token, user }) {
      console.log('jwt token : ', token,' user : ', user);
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

      console.log('session token : ', token);
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

          

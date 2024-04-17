import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import "next-auth/jwt";

import bcryptjs from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { getUserByEmail } from "./data/user";
import { AuthCredentialsSchema } from "./lib/validators/account-credentials-validator";

import { getUserById } from "@/data/user";
import { db } from "@/lib/utils/db";

import authConfig from "./auth.config";
import { getTwoFactorConfirmationByUserID } from "./data/two-factor-confirmation";

// import authConfig from "./auth.config";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {
      role: "TRADINGECONOMICS" | "TSHIMEGA";
      id: string;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role: "TRADINGECONOMICS" | "TSHIMEGA";
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = AuthCredentialsSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email: validatedEmail, password: validatedPassword } =
            validatedFields.data;

          const user = await getUserByEmail(validatedEmail);
          if (!user || !user.password) return null;

          const isValidPassword = await bcryptjs.compare(
            validatedPassword,
            user.password
          );

          if (isValidPassword) return user;
        }
        return null;
      },
    }),
  ],
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // allow all users to sign in without email verification for OAuth providers (Google)
      if (account?.provider && account.provider !== "credentials") {
        return true;
      }

      if (user.id) {
        const existingUser = await getUserById(user.id);
        // Prevent sign-in without email verification
        if (!existingUser?.emailVerified) return false;
        // Prevent sign-in without two-factor confirmation
        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserID(
            existingUser.id
          );

          if (!twoFactorConfirmation) return false;

          await db.twoFactorConfirmation.delete({
            where: {
              id: twoFactorConfirmation.id,
            },
          });
        }
      }

      return true;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          id: token.sub,
        },
      };
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      return {
        ...token,
        role: existingUser.role,
        sub: existingUser.id,
      };
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
});

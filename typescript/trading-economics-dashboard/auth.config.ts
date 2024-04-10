import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { getUserByEmail } from "./data/user";
import { AuthCredentialsSchema } from "./lib/validators/account-credentials-validator";
import bcrpyt from "bcrypt";

export default {
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

          const isValidPassword = await bcrpyt.compare(
            validatedPassword,
            user.password
          );

          if (isValidPassword) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

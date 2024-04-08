"use server";

import bcryptjs from "bcryptjs";

import {
  AuthCredentialsSchema,
  TAuthCredentialsValidator,
} from "../../lib/validators/account-credentials-validator";

import { db } from "@/lib/utils/db";
import { generateVerificationToken } from "@/lib/utils/tokens";
import { sendVerificationEmail } from "@/lib/utils/mail";
import { getUserByEmail } from "@/data/user";

export async function CreateAccount({
  email,
  password,
}: TAuthCredentialsValidator) {
  const validatedFields = await AuthCredentialsSchema.safeParseAsync({
    email,
    password,
  });

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email: validatedEmail, password: validatedPassword } =
    validatedFields.data;

  const hashedPassword = await bcryptjs.hash(validatedPassword, 10);

  const existingUser = await getUserByEmail(validatedEmail);

  if (existingUser) {
    return {
      error: "Oops! That email address is already taken.",
    };
  }

  await db.user.create({
    data: {
      email: validatedEmail,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(validatedEmail);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
}

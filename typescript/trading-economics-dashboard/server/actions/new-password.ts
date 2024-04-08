"use server";

import { getResetPasswordTokenByToken } from "@/data/reset-password-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/utils/db";
import {
  NewPasswordSchema,
  TNewPasswordValidator,
} from "@/lib/validators/new-password-validator";

import bcryptjs from "bcryptjs";

export const newPassword = async (
  { password, confirmPassword }: TNewPasswordValidator,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing new-password token!" };
  }

  const validatedFields = await NewPasswordSchema.safeParseAsync({
    password,
    confirmPassword,
  });

  if (!validatedFields.success) {
    return { error: "Invalid Password!" };
  }

  const {
    password: validatedPassword,
    confirmPassword: validatedConfirmPassword,
  } = validatedFields.data;

  if (validatedPassword !== validatedConfirmPassword) {
    return { error: "Passwords do not match!" };
  }

  const existingToken = await getResetPasswordTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expiresAt) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcryptjs.hash(validatedPassword, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.resetPasswordToken.delete({ where: { id: existingToken.id } });

  return { success: "Password updated!" };
};

"use server";

import { getUserByEmail } from "../../data/user";
import { sendResetPasswordEmail } from "../../lib/mail";
import { generateResetPasswordToken } from "../../lib/tokens";
import {
  ResetPasswordSchema,
  TResetPasswordValidator,
} from "../../lib/validators/reset-email-validator";

export const resetEmail = async ({ email }: TResetPasswordValidator) => {
  const validatedFields = await ResetPasswordSchema.safeParseAsync({ email });

  if (!validatedFields.success) {
    return { error: "Invalid Email!" };
  }

  const { email: validatedEmail } = validatedFields.data;

  const existingUser = await getUserByEmail(validatedEmail);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const resetPasswordToken = await generateResetPasswordToken(validatedEmail);
  await sendResetPasswordEmail(
    resetPasswordToken.email,
    resetPasswordToken.token
  );

  return { success: "Reset email sent!" };
};

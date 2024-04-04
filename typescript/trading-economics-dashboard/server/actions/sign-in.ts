"use server";

import { signIn } from "../../auth";
import { getUserByEmail } from "../../data/user";
import { getTwoFactorTokenByEmail } from "../../data/two-factor-token";
import {
  AuthCredentialsSchema,
  TAuthCredentialsValidator,
} from "../../lib/validators/account-credentials-validator";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { AuthError } from "next-auth";

import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "../../lib/tokens";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "../../lib/mail";
import { db } from "../../lib/db";
import { getTwoFactorConfirmationByUserID } from "../../data/two-factor-confirmation";

export async function SignIn({
  email,
  password,
  code,
}: TAuthCredentialsValidator) {
  const validatedFields = await AuthCredentialsSchema.safeParseAsync({
    email,
    password,
    code,
  });

  if (!validatedFields.success) {
    return { error: "Invalid email or password." };
  }

  const {
    email: validatedEmail,
    password: validatedPassword,
    code: validatedCode,
  } = validatedFields.data;

  const existingUser = await getUserByEmail(validatedEmail);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (validatedCode) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return { error: "Invalid two-factor code!" };
      }

      if (twoFactorToken.token !== validatedCode) {
        return { error: "Invalid two-factor code!" };
      }

      const hasExpired = new Date(twoFactorToken.expiresAt) < new Date();

      if (hasExpired) {
        return { error: "Token has expired!" };
      }

      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

      const existingConfirmation = await getTwoFactorConfirmationByUserID(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email: validatedEmail,
      password: validatedPassword,
      redirectTo: `${DEFAULT_LOGIN_REDIRECT}/${existingUser.id}`,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        case "AccessDenied":
          return { error: "Access denied." };
        case "AccountNotLinked":
          return { error: "Account not linked." };
        case "InvalidCallbackUrl":
          return { error: "Invalid callback URL." };
        case "JWTSessionError":
          return { error: "JWT session error." };
        case "CallbackRouteError":
          return { error: "Callback route error." };
        case "EmailSignInError":
          return { error: "Email sign-in error." };
        case "SessionTokenError":
          return { error: "Session token error." };
        case "OAuthSignInError":
          return { error: "OAuth sign-in error." };
        case "InvalidProvider":
          return { error: "Invalid provider." };
        case "Verification":
          return { error: "Please verify your email." };
        default:
          return { error: "Oops! Internal server error." };
      }
    }
    throw error;
  }
}

import ConfirmationEmail from "../emails/confirmation-email";
import ResetPasswordEmail from "../emails/reset-password-email";
import TwoFactorEmail from "../emails/two-factor-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `http://${process.env.NEXT_DEVELOPMENT_URL}/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Trading Economics <onboarding@resend.dev>",
    to: email,
    subject: "Please verify your email address.",
    react: ConfirmationEmail({ confirmationLink }),
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetPasswordLink = `http://${process.env.NEXT_DEVELOPMENT_URL}/new-password?token=${token}`;

  await resend.emails.send({
    from: "Trading Economics <onboarding@resend.dev>",
    to: email,
    subject: "Reset your TE password.",
    react: ResetPasswordEmail({ resetPasswordLink }),
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Trading Economics <onboarding@resend.dev>",
    to: email,
    subject: "2FA Trading Economics",
    react: TwoFactorEmail({ token }),
  });
};

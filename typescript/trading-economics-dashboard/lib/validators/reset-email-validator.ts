import { z } from "zod";

export const ResetPasswordSchema = z.object({
  email: z.string().email(),
});

export type TResetPasswordValidator = z.infer<typeof ResetPasswordSchema>;

import { z } from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export type TNewPasswordValidator = z.infer<typeof NewPasswordSchema>;

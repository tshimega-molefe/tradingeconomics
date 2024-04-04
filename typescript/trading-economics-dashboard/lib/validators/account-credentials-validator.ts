import { z } from "zod";

export const AuthCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  code: z.optional(z.string()),
});

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsSchema>;

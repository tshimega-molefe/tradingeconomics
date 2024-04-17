import type { NextAuthConfig } from "next-auth";

export default {
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/error",
  },
  providers: [],
} satisfies NextAuthConfig;

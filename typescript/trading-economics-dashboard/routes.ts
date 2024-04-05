/**
 * Array of (unprotected)(root) routes that do not require the user to be authenticated.
 * @type {string[]}
 */

export const unprotectedRoutes = [
  "/",
  "/privacy-policy",
  "/user-agreement",
  "/new-verification",
];

/**
 * Array of (unprotected)(auth) routes that are used for authentication.
 * These routes will redirect the user to the trader dashboard if they are already authenticated.
 * @type {string[]}
 */

export const authRoutes = [
  "/sign-in",
  "/create-account",
  "/reset-password",
  "/error",
  "/new-password",
];

/**
 * The prefix for api authentication routes.
 * This is used to make requests to the server for authentication.
 * @type {string}
 */

export const apiAuthPrefix = ["/api/auth", "/api/search"];

/**
 * The default redirect path after a user logs in.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/trader";

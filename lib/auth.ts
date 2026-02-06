import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

export const auth = betterAuth({
  baseURL,
  trustedOrigins: [baseURL],
  socialProviders: {
    twitch: {
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});

// Auth config for MIDDLEWARE only - Edge Runtime compatible
// This file should ONLY be imported by middleware.ts
// DO NOT import this from other files!

import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const middlewareAuthConfig = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" as const },
  cookies: {
    sessionToken: {
      name: `__Secure-authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

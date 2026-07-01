import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

/**
 * Get current authenticated user.
 * If a NextRequest is provided, use the JWT token.
 * Otherwise fallback to auth() for the current request context.
 */
export async function getCurrentUser(request?: NextRequest) {
  if (request) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    if (!token) {
      return null;
    }

    return {
      id: token.id as string,
      email: token.email as string,
      name: token.name as string | null,
      image: token.picture as string | null,
      provider: token.provider as string | undefined,
    };
  }

  return getCurrentUserFromAuth();
}

/**
 * Get current authenticated user from headers (for API routes)
 * Alternative method using auth()
 */
export async function getCurrentUserFromAuth() {
  const { auth } = await import("@/lib/auth");
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name ?? null,
    image: session.user.image ?? null,
    provider: session.user.provider,
  };
}

export async function requireAuth() {
  const user = await getCurrentUserFromAuth();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function requireAuth() {
  const user = await getCurrentUserFromAuth();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

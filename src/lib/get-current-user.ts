import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Get current authenticated user from NextAuth session
 * Returns null if not authenticated
 */
export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  return user;
}

/**
 * Require authenticated user - throws if not authenticated
 * Use this in API routes that require authentication
 */
export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

"use client";

import { useSession } from "next-auth/react";

function getFirstName(fullName: string | null | undefined): string {
  if (!fullName) return "User";
  const parts = fullName.trim().split(/\s+/);
  return parts[0];
}

export function WelcomeBanner() {
  const { data: session } = useSession();

  const firstName = getFirstName(session?.user?.name);

  return (
    <div className="mb-2">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
        Halo, <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">{firstName}</span>! 👋
      </h1>
    </div>
  );
}

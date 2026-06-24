import { prisma } from "@/lib/prisma";

const DEV_USER_EMAIL = "dev@sinauwu.local";

export async function getDevUser() {
  const user = await prisma.user.upsert({
    where: {
      email: DEV_USER_EMAIL,
    },
    update: {},
    create: {
      name: "Dev User",
      email: DEV_USER_EMAIL,
    },
  });

  return user;
}
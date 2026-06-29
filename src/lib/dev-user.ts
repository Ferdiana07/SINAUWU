import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const DEV_USER_EMAIL = "dev@sinauwu.local";
const DEV_USER_PASSWORD = "devpassword123";

export async function getDevUser() {
  // Hash password if creating new user
  const hashedPassword = await bcrypt.hash(DEV_USER_PASSWORD, 10);

  const user = await prisma.user.upsert({
    where: {
      email: DEV_USER_EMAIL,
    },
    update: {},
    create: {
      name: "Dev User",
      email: DEV_USER_EMAIL,
      password: hashedPassword,
    },
  });

  return user;
}
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const documentCount = await prisma.document.count();

    return Response.json({
      ok: true,
      message: "Database connected successfully",
      data: {
        userCount,
        documentCount,
      },
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        message: "Database connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}
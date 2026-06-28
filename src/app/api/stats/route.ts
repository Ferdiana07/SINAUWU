import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [totalDocuments, totalQuizzes] = await Promise.all([
      prisma.document.count(),
      prisma.quiz.count(),
    ]);

    return NextResponse.json({
      totalDocuments,
      totalQuizzes,
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
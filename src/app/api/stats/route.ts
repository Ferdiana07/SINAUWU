import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    // If not authenticated, return zeros
    if (!token || !token.id) {
      return NextResponse.json({
        totalDocuments: 0,
        totalQuizzes: 0,
        totalFlashcards: 0,
        averageScore: 0,
        isAuthenticated: false,
      });
    }

    const [totalDocuments, totalQuizzes, totalFlashcards, recentAttempts] = await Promise.all([
      prisma.document.count({
        where: { userId: token.id as string },
      }),
      prisma.quiz.count({
        where: { document: { userId: token.id as string } },
      }),
      prisma.flashcard.count({
        where: { document: { userId: token.id as string } },
      }),
      prisma.quizAttempt.findMany({
        where: { userId: token.id as string },
        select: { score: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

    // Calculate average score
    const averageScore = recentAttempts.length > 0
      ? Math.round(recentAttempts.reduce((acc, attempt) => acc + attempt.score, 0) / recentAttempts.length)
      : 0;

    return NextResponse.json({
      totalDocuments,
      totalQuizzes,
      totalFlashcards,
      averageScore,
      isAuthenticated: true,
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

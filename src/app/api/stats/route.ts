import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/get-current-user";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();

    // If not authenticated, return zeros
    if (!user) {
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
        where: { userId: user.id },
      }),
      prisma.quiz.count({
        where: { document: { userId: user.id } },
      }),
      prisma.flashcard.count({
        where: { document: { userId: user.id } },
      }),
      prisma.quizAttempt.findMany({
        where: { userId: user.id },
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
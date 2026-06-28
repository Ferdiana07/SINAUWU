import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Delete all quiz questions first
    await prisma.quizQuestion.deleteMany({
      where: {
        quiz: {
          documentId: id,
        },
      },
    });

    // Delete all quiz attempts
    await prisma.quizAttempt.deleteMany({
      where: {
        quiz: {
          documentId: id,
        },
      },
    });

    // Delete all quizzes by documentId
    await prisma.quiz.deleteMany({
      where: {
        documentId: id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "All quizzes deleted",
    });
  } catch (error) {
    console.error("Delete quizzes error:", error);
    return NextResponse.json(
      { error: "Failed to delete quizzes" },
      { status: 500 }
    );
  }
}

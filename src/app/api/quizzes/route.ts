import { prisma } from "@/lib/prisma";
import { generateQuiz } from "@/lib/ai/quiz";
import { getCurrentUser } from "@/lib/get-current-user";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { documentId } = await req.json();

    if (!documentId) {
      return Response.json(
        { error: "documentId is required" },
        { status: 400 }
      );
    }

    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      return Response.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    // Verify document belongs to current user
    if (document.userId !== user.id) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    if (!document.rawText) {
      return Response.json(
        { error: "Document has no text" },
        { status: 400 }
      );
    }

    const existingQuiz = await prisma.quiz.findFirst({
      where: { documentId },
    });

    if (existingQuiz) {
      return Response.json({
        success: true,
        message: "Quiz already exists",
      });
    }

    const generatedQuiz = await generateQuiz(document.rawText);

    const quiz = await prisma.quiz.create({
      data: {
        documentId: document.id,
        title: `Quiz ${document.title}`,
      },
    });

    await prisma.quizQuestion.createMany({
      data: generatedQuiz.map((question) => ({
        quizId: quiz.id,
        question: question.question,
        optionA: question.optionA,
        optionB: question.optionB,
        optionC: question.optionC,
        optionD: question.optionD,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      })),
    });

    return Response.json({
      success: true,
      count: generatedQuiz.length,
    });
  } catch (error) {
    console.error("QUIZ ERROR:", error);

    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const quizzes = await prisma.quiz.findMany({
      where: {
        document: {
          userId: user.id,
        },
      },
      include: {
        document: true,
        questions: true,
        attempts: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      data: quizzes,
    });
  } catch (error) {
    console.error("QUIZ ERROR:", error);

    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";

type AnswersPayload = Record<string, string>;

function isAnswersPayload(value: unknown): value is AnswersPayload {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { quizId, answers } = await req.json();

    if (!quizId || typeof quizId !== "string") {
      return Response.json(
        { error: "quizId is required" },
        { status: 400 }
      );
    }

    if (!isAnswersPayload(answers)) {
      return Response.json(
        { error: "answers must be an object" },
        { status: 400 }
      );
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: true,
        document: true,
      },
    });

    if (!quiz) {
      return Response.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    // Verify quiz belongs to current user
    if (quiz.document.userId !== user.id) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    let score = 0;

    const results = quiz.questions.map((question) => {
      const selectedAnswer = answers[question.id] ?? null;
      const isCorrect = selectedAnswer === question.correctAnswer;

      if (isCorrect) {
        score++;
      }

      return {
        questionId: question.id,
        selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
      };
    });

    const attempt = await prisma.quizAttempt.create({
      data: {
        quizId: quiz.id,
        userId: user.id,
        score,
      },
    });

    return Response.json({
      success: true,
      attemptId: attempt.id,
      score,
      total: quiz.questions.length,
      results,
    });
  } catch (error) {
    console.error("QUIZ ATTEMPT ERROR:", error);

    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

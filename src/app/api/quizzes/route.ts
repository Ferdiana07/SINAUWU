import { prisma } from "@/lib/prisma";
import { generateQuiz } from "@/lib/ai/quiz";

export async function POST(
  req: Request
) {
  try {

    const { documentId } =
      await req.json();

    if (!documentId) {
      return Response.json(
        {
          error:
            "documentId is required",
        },
        {
          status: 400,
        }
      );
    }

    const document =
      await prisma.document.findUnique({
        where: {
          id: documentId,
        },
      });

    if (!document) {
      return Response.json(
        {
          error:
            "Document not found",
        },
        {
          status: 404,
        }
      );
    }

    if (!document.rawText) {
      return Response.json(
        {
          error:
            "Document has no text",
        },
        {
          status: 400,
        }
      );
    }

    const existingQuiz =
        await prisma.quiz.findFirst({
            where: {
            documentId,
            },
        });

        if (existingQuiz) {
        return Response.json({
            success: true,
            message:
            "Quiz already exists",
        });
    }

    const generatedQuiz =
      await generateQuiz(
        document.rawText
      );

    const quiz =
      await prisma.quiz.create({
        data: {
          documentId:
            document.id,

          title:
            `Quiz ${document.title}`,
        },
      });

    await prisma.quizQuestion.createMany({
      data: generatedQuiz.map(
        (question) => ({
          quizId: quiz.id,

          question:
            question.question,

          optionA:
            question.optionA,

          optionB:
            question.optionB,

          optionC:
            question.optionC,

          optionD:
            question.optionD,

          correctAnswer:
            question.correctAnswer,

          explanation:
            question.explanation,
        })
      ),
    });

    return Response.json({
      success: true,
      count:
        generatedQuiz.length,
    });

  } catch (error) {

    console.error(
      "QUIZ ERROR:",
      error
    );

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
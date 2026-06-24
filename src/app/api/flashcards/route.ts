import { prisma } from "@/lib/prisma";
import { generateFlashcards } from "@/lib/ai/flashcards";

export async function POST(req: Request) {
  try {
    const { documentId } = await req.json();

    if (!documentId || typeof documentId !== "string") {
      return Response.json(
        {
          error: "documentId is required",
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
          error: "Document not found",
        },
        {
          status: 404,
        }
      );
    }

    if (!document.rawText?.trim()) {
      return Response.json(
        {
          error:
            "Document does not have extracted text",
        },
        {
          status: 400,
        }
      );
    }

    const flashcards =
      await generateFlashcards(
        document.rawText
      );

    await prisma.flashcard.deleteMany({
      where: {
        documentId,
      },
    });

    await prisma.flashcard.createMany({
      data: flashcards.map((card) => ({
        documentId,
        question: card.question,
        answer: card.answer,
      })),
    });

    return Response.json({
      success: true,
      count: flashcards.length,
    });
  } catch (error) {
    console.error(
      "FLASHCARD ERROR:",
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
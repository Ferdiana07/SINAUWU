import { prisma } from "@/lib/prisma";
import { generateFlashcards } from "@/lib/ai/flashcards";
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

    if (!documentId || typeof documentId !== "string") {
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

    if (!document.rawText?.trim()) {
      return Response.json(
        { error: "Document does not have extracted text" },
        { status: 400 }
      );
    }

    const existingFlashcards = await prisma.flashcard.findFirst({
      where: { documentId },
    });

    if (existingFlashcards) {
      return Response.json({
        success: true,
        message: "Flashcards already exist",
      });
    }

    const flashcards = await generateFlashcards(document.rawText);

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
    console.error("FLASHCARD ERROR:", error);

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

    const flashcards = await prisma.flashcard.findMany({
      where: {
        document: {
          userId: user.id,
        },
      },
      include: {
        document: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      data: flashcards,
    });
  } catch (error) {
    console.error("FLASHCARD ERROR:", error);

    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { generateSummary } from "@/lib/ai/summary";

export async function POST(req: Request) {
  try {
    const { documentId } = await req.json();

    if (!documentId || typeof documentId !== "string") {
      return Response.json(
        { error: "documentId is required" },
        { status: 400 },
      );
    }

    const document = await prisma.document.findUnique({
      where: {
        id: documentId,
      },
    });

    if (!document) {
      return Response.json(
        { error: "Document not found" },
        { status: 404 },
      );
    }

    if (!document.rawText?.trim()) {
      return Response.json(
        { error: "Document does not have extracted text" },
        { status: 400 },
      );
    }

    const generatedSummary = await generateSummary(document.rawText);

    const summary = await prisma.summary.upsert({
      where: {
        documentId: document.id,
      },
      update: {
        shortSummary: generatedSummary.shortSummary,
        detailedSummary: generatedSummary.detailedSummary,
        keyPoints: generatedSummary.keyPoints,
      },
      create: {
        documentId: document.id,
        shortSummary: generatedSummary.shortSummary,
        detailedSummary: generatedSummary.detailedSummary,
        keyPoints: generatedSummary.keyPoints,
      },
    });

    await prisma.document.update({
      where: {
        id: document.id,
      },
      data: {
        status: "PROCESSED",
      },
    });

    return Response.json({
      success: true,
      summary,
    });
  } catch (error) {
  console.error("SUMMARY ERROR:", error);

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

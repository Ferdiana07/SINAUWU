import { prisma } from "@/lib/prisma";
import { generateSummary } from "@/lib/ai/summary";
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
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

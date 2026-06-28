import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Delete all flashcards by documentId
    await prisma.flashcard.deleteMany({
      where: {
        documentId: id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Flashcards deleted",
    });
  } catch (error) {
    console.error("Delete flashcards error:", error);
    return NextResponse.json(
      { error: "Failed to delete flashcards" },
      { status: 500 }
    );
  }
}

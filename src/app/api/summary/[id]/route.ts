import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if summary exists first
    const existing = await prisma.summary.findUnique({
      where: {
        documentId: id,
      },
    });

    if (!existing) {
      return NextResponse.json({
        success: true,
        message: "No summary to delete",
      });
    }

    // Delete summary by documentId
    await prisma.summary.delete({
      where: {
        documentId: id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Summary deleted",
    });
  } catch (error) {
    console.error("Delete summary error:", error);
    return NextResponse.json(
      { error: "Failed to delete summary" },
      { status: 500 }
    );
  }
}

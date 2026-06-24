import { prisma } from "@/lib/prisma";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
  req: Request,
  { params }: RouteProps
) {
  try {
    const { id } = await params;

    const document =
      await prisma.document.findUnique({
        where: {
          id,
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

    await prisma.document.delete({
      where: {
        id,
      },
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to delete",
      },
      {
        status: 500,
      }
    );
  }
}
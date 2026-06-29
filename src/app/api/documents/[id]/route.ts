import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/get-current-user";

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
    const user = await requireAuth();
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

    // Verify document belongs to current user
    if (document.userId !== user.id) {
      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 403,
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
    if (error instanceof Error && error.message === "Unauthorized") {
      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
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
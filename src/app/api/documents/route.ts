import { getDevUser } from "@/lib/dev-user";
import { prisma } from "@/lib/prisma";

const DEV_USER_EMAIL = "dev@sinauwu.local";

export async function GET() {
  try {
    const user = await getDevUser();

    const documents = await prisma.document.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      ok: true,
      message: "Documents fetched successfully",
      data: documents,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        message: "Failed to fetch documents",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.fileName) {
      return Response.json(
        {
          ok: false,
          message: "title and fileName are required",
        },
        {
          status: 400,
        },
      );
    }

    const user = await getDevUser();

    const document = await prisma.document.create({
      data: {
        userId: user.id,
        title: body.title,
        fileName: body.fileName,
        rawText: body.rawText ?? null,
      },
    });

    return Response.json(
      {
        ok: true,
        message: "Document created successfully",
        data: document,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return Response.json(
      {
        ok: false,
        message: "Failed to create document",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}
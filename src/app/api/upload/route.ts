import { getDevUser } from "@/lib/dev-user";
import { prisma } from "@/lib/prisma";
import { extractPdfText } from "@/lib/pdf/extract-text";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title");
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return Response.json(
        {
          ok: false,
          message: "File PDF wajib diupload",
        },
        {
          status: 400,
        },
      );
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return Response.json(
        {
          ok: false,
          message: "File harus berformat PDF",
        },
        {
          status: 400,
        },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        {
          ok: false,
          message: "Ukuran file maksimal 5 MB",
        },
        {
          status: 400,
        },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extractedText = await extractPdfText(buffer);
    console.log("PDF extracted:");
    console.log(extractedText.slice(0, 300));
    const user = await getDevUser();

    const documentTitle =
      typeof title === "string" && title.trim().length > 0
        ? title.trim()
        : file.name.replace(/\.pdf$/i, "");

    const document = await prisma.document.create({
      data: {
        userId: user.id,
        title: documentTitle,
        fileName: file.name,
        rawText: extractedText,
      },
    });

    return Response.json(
      {
        ok: true,
        message: "PDF uploaded successfully",
        data: document,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return Response.json(
      {
        ok: false,
        message: "Failed to upload PDF",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractPdfText } from "@/lib/pdf/extract-text";
import { getToken } from "next-auth/jwt";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  // Get token directly from request
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    cookieName: `__Secure-authjs.session-token`,
  });

  if (!token || !token.id) {
    return Response.json(
      { ok: false, message: "Unauthorized - please login again" },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return Response.json(
        { ok: false, message: "File PDF wajib diupload" },
        { status: 400 }
      );
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return Response.json(
        { ok: false, message: "File harus berformat PDF" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { ok: false, message: "Ukuran file maksimal 5 MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extractedText = await extractPdfText(buffer);

    const documentTitle =
      typeof title === "string" && title.trim().length > 0
        ? title.trim()
        : file.name.replace(/\.pdf$/i, "");

    const document = await prisma.document.create({
      data: {
        userId: token.id,
        title: documentTitle,
        fileName: file.name,
        rawText: extractedText,
      },
    });

    return Response.json(
      { ok: true, message: "PDF uploaded successfully", data: document },
      { status: 201 }
    );
  } catch (error) {
    console.error("[UPLOAD] ERROR:", error);

    return Response.json(
      {
        ok: false,
        message: "Failed to upload PDF",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

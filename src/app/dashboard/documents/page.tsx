import Link from "next/link";
import { prisma } from "@/lib/prisma";
import GenerateSummaryButton
from "@/components/generate-summary-button";
import GenerateFlashcardsButton
from "@/components/generate-flashcards-button";
import DeleteDocumentButton
from "@/components/delete-document-button";

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({
    include: {
      summary: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Documents
      </h1>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
  key={doc.id}
  className="border rounded-lg p-4"
>
  <h2 className="font-semibold">
    {doc.title}
  </h2>

  <p className="text-sm text-muted-foreground">
    {doc.fileName}
  </p>

  <p className="text-sm">
    Status Summary:
    {" "}
    {doc.summary
      ? "✅ Generated"
      : "❌ Belum"}
  </p>

  {doc.summary && (
  <div className="mt-3 flex gap-3">

    <Link
      href={`/dashboard/documents/${doc.id}`}
      className="text-blue-600 hover:underline"
    >
      View Summary
    </Link>

    <Link
      href={`/dashboard/documents/${doc.id}/flashcards`}
      className="text-green-600 hover:underline"
    >
      View Flashcards
    </Link>

    <GenerateFlashcardsButton
      documentId={doc.id}
    />

    <DeleteDocumentButton
      documentId={doc.id}
    />

  </div>
)}

  {!doc.summary && (
    <GenerateSummaryButton
      documentId={doc.id}
    />
  )}
</div>
        ))}
      </div>
    </div>
  );
}
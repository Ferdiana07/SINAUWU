import { prisma } from "@/lib/prisma";
import { DocumentsClient } from "@/components/documents-client";

export const dynamic = "force-dynamic";

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({
    include: {
      summary: true,
      flashcards: true,
      quizzes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Serialize dates for client component
  const serializedDocuments = documents.map((doc) => ({
    id: doc.id,
    title: doc.title,
    fileName: doc.fileName,
    status: doc.status,
    createdAt: doc.createdAt,
    summary: doc.summary,
    flashcards: doc.flashcards,
    quizzes: doc.quizzes,
  }));

  return <DocumentsClient initialDocuments={serializedDocuments} />;
}
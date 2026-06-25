import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

import GenerateSummaryButton
from "@/components/generate-summary-button";

import GenerateFlashcardsButton
from "@/components/generate-flashcards-button";

import GenerateQuizButton
from "@/components/generate-quiz-button";

import DeleteDocumentButton
from "@/components/delete-document-button";

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
              Status Summary:{" "}
              {doc.summary
                ? "✅ Generated"
                : "❌ Belum"}
            </p>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                {/* SUMMARY */}
                {doc.summary ? (
                  <Button
                    asChild
                    variant="outline"
                  >
                    <Link
                      href={`/dashboard/documents/${doc.id}/summary`}
                    >
                      View Summary
                    </Link>
                  </Button>
                ) : (
                  <GenerateSummaryButton
                    documentId={doc.id}
                  />
                )}

                {/* FLASHCARDS */}
                {doc.flashcards.length > 0 ? (
                  <Button
                    asChild
                    variant="outline"
                  >
                    <Link
                      href={`/dashboard/documents/${doc.id}/flashcards`}
                    >
                      View Flashcards
                    </Link>
                  </Button>
                ) : (
                  <GenerateFlashcardsButton
                    documentId={doc.id}
                  />
                )}

                {/* QUIZ */}
                {doc.quizzes.length > 0 ? (
                  <Button
                    asChild
                    variant="outline"
                  >
                    <Link
                      href={`/dashboard/documents/${doc.id}/quiz`}
                    >
                      View Quiz
                    </Link>
                  </Button>
                ) : (
                  <GenerateQuizButton
                    documentId={doc.id}
                  />
                )}
              </div>

              <div className="sm:ml-auto">
                <DeleteDocumentButton
                  documentId={doc.id}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


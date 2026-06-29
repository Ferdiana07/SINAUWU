import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { TopHeader } from "@/components/top-header";
import GenerateSummaryButton, { RegenerateSummaryButton } from "@/components/generate-summary-button";
import GenerateFlashcardsButton, { RegenerateFlashcardsButton } from "@/components/generate-flashcards-button";
import GenerateQuizButton, { RegenerateQuizButton } from "@/components/generate-quiz-button";
import DeleteDocumentButton from "@/components/delete-document-button";
import { FileText, Calendar } from "lucide-react";
import { redirect, notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
  const { id } = await params;

  const document = await prisma.document.findUnique({
    where: { id },
    include: {
      summary: true,
      flashcards: true,
      quizzes: true,
    },
  });

  // Document not found or doesn't belong to user
  if (!document || document.userId !== userId) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const learningOptions = [
    {
      title: "Rangkuman",
      description: "Rangkuman akan merangkum seluruh isi dokumen PDF menjadi poin-poin penting yang mudah dipahami. Cocok untuk review cepat sebelum ujian.",
      count: document.summary ? "1 rangkuman" : null,
    },
    {
      title: "Flashcard",
      description: "Flashcard akan mengubah materi PDF menjadi kartu tanya jawab interaktif. Berguna untuk mengingat konsep penting dengan teknik spaced repetition.",
      count: document.flashcards.length > 0 ? `${document.flashcards.length} kartu` : null,
    },
    {
      title: "Quiz",
      description: "Quiz akan membuat soal pilihan ganda berdasarkan materi PDF. Uji pemahamanmu dan lihat skor untuk mengetahui seberapa paham materinya.",
      count: document.quizzes.length > 0 ? `${document.quizzes.length} quiz` : null,
    },
  ];

  return (
    <div className="space-y-6">
      <TopHeader
        title={document.title}
        actions={<DeleteDocumentButton documentId={document.id} />}
      />

      {/* Document Info */}
      <Card className="border-border/50">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{document.fileName}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">Diupload: {formatDate(document.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Options - 3 Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Rangkuman Card */}
        <Card className="border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/5">
          <CardContent className="p-4 sm:p-6">
            <div className="mb-2">
              <h3 className="text-base font-semibold">Rangkuman</h3>
              {document.summary && (
                <span className="text-xs text-emerald-600 font-medium">✓ {learningOptions[0].count}</span>
              )}
            </div>
            <p className="mb-4 sm:mb-6 text-sm text-muted-foreground leading-relaxed">
              {learningOptions[0].description}
            </p>

            {/* Tombol Actions */}
            <div className="space-y-2">
              {document.summary ? (
                <>
                  <Link
                    href={`/dashboard/documents/${document.id}/summary`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    Buka Rangkuman
                  </Link>
                  <RegenerateSummaryButton />
                </>
              ) : (
                <GenerateSummaryButton />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Flashcard Card */}
        <Card className="border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/5">
          <CardContent className="p-4 sm:p-6">
            <div className="mb-2">
              <h3 className="text-base font-semibold">Flashcard</h3>
              {document.flashcards.length > 0 && (
                <span className="text-xs text-emerald-600 font-medium">✓ {learningOptions[1].count}</span>
              )}
            </div>
            <p className="mb-4 sm:mb-6 text-sm text-muted-foreground leading-relaxed">
              {learningOptions[1].description}
            </p>

            {/* Tombol Actions */}
            <div className="space-y-2">
              {document.flashcards.length > 0 ? (
                <>
                  <Link
                    href={`/dashboard/documents/${document.id}/flashcards`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    Buka Flashcard
                  </Link>
                  <RegenerateFlashcardsButton />
                </>
              ) : (
                <GenerateFlashcardsButton />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quiz Card */}
        <Card className="border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/5 sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 sm:p-6">
            <div className="mb-2">
              <h3 className="text-base font-semibold">Quiz</h3>
              {document.quizzes.length > 0 && (
                <span className="text-xs text-emerald-600 font-medium">✓ {learningOptions[2].count}</span>
              )}
            </div>
            <p className="mb-4 sm:mb-6 text-sm text-muted-foreground leading-relaxed">
              {learningOptions[2].description}
            </p>

            {/* Tombol Actions */}
            <div className="space-y-2">
              {document.quizzes.length > 0 ? (
                <>
                  <Link
                    href={`/dashboard/documents/${document.id}/quiz`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    Buka Quiz
                  </Link>
                  <RegenerateQuizButton />
                </>
              ) : (
                <GenerateQuizButton />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

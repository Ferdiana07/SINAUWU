import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TopHeader } from "@/components/top-header";
import GenerateSummaryButton from "@/components/generate-summary-button";
import GenerateFlashcardsButton from "@/components/generate-flashcards-button";
import GenerateQuizButton from "@/components/generate-quiz-button";
import DeleteDocumentButton from "@/components/delete-document-button";
import {
  FileText,
  Layers,
  ClipboardList,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const document = await prisma.document.findUnique({
    where: { id },
    include: {
      summary: true,
      flashcards: true,
      quizzes: true,
    },
  });

  if (!document) {
    return (
      <div className="space-y-6">
        <TopHeader title="Dokumen Tidak Ditemukan" />
        <Card className="border-destructive/50">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10">
              <FileText className="h-10 w-10 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold">Dokumen tidak ditemukan</h3>
            <p className="mt-2 text-center text-muted-foreground">
              Dokumen yang kamu cari tidak ada atau sudah dihapus.
            </p>
            <Button asChild className="mt-6">
              <Link href="/dashboard/documents">Kembali ke Dokumen</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const learningOptions = [
    {
      title: "Rangkuman",
      description: "Baca penjelasan ringkas yang mudah dipahami sebelum masuk ke materi lebih dalam.",
      icon: FileText,
      gradient: "from-blue-500 to-cyan-500",
      href: document.summary ? `/dashboard/documents/${document.id}/summary` : null,
      generated: !!document.summary,
      generateButton: <GenerateSummaryButton documentId={document.id} fullWidth />,
      count: document.summary ? "1 rangkuman" : null,
    },
    {
      title: "Flashcard",
      description: "Latih hafalan dengan kartu interaktif yang memudahkan review materi.",
      icon: Layers,
      gradient: "from-violet-500 to-purple-500",
      href: document.flashcards.length > 0 ? `/dashboard/documents/${document.id}/flashcards` : null,
      generated: document.flashcards.length > 0,
      generateButton: <GenerateFlashcardsButton documentId={document.id} fullWidth />,
      count: document.flashcards.length > 0 ? `${document.flashcards.length} kartu` : null,
    },
    {
      title: "Quiz",
      description: "Uji pemahaman dengan soal latihan langsung dari materi yang kamu upload.",
      icon: ClipboardList,
      gradient: "from-emerald-500 to-teal-500",
      href: document.quizzes.length > 0 ? `/dashboard/documents/${document.id}/quiz` : null,
      generated: document.quizzes.length > 0,
      generateButton: <GenerateQuizButton documentId={document.id} fullWidth />,
      count: document.quizzes.length > 0 ? `${document.quizzes.length} quiz` : null,
    },
  ];

  return (
    <div className="space-y-6">
      <TopHeader
        title={document.title}
        actions={<DeleteDocumentButton documentId={document.id} />}
      />

      {/* Document Info Card */}
      <Card className="border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                <FileText className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{document.title}</h2>
                <p className="text-sm text-muted-foreground">{document.fileName}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                <Badge
                  variant="secondary"
                  className={document.status === "PROCESSED" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}
                >
                  {document.status === "PROCESSED" ? (
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                  ) : (
                    <Clock className="mr-1 h-3 w-3" />
                  )}
                  {document.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Upload: {document.createdAt.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Options */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Pilih Cara Belajar</h2>

        <div className="grid gap-4 md:grid-cols-3">
          {learningOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.title}
                className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
              >
                {/* Gradient accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />

                <CardContent className="relative p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`rounded-xl ${option.gradient} p-3 shadow-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    {option.count && (
                      <Badge variant="secondary" className="text-xs">
                        {option.count}
                      </Badge>
                    )}
                  </div>

                  <h3 className="mb-2 text-lg font-semibold">{option.title}</h3>
                  <p className="mb-6 text-sm text-muted-foreground">{option.description}</p>

                  {option.href ? (
                    <Button asChild className="w-full">
                      <Link href={option.href}>
                        Buka {option.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    option.generateButton
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <Card className="border-border/50">
        <CardContent className="p-6">
          <h3 className="mb-4 text-sm font-semibold text-muted-foreground">RINGKASAN PEMBUATAN</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-2xl font-bold">{document.summary ? "✓" : "–"}</p>
              <p className="mt-1 text-xs text-muted-foreground">Summary</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-2xl font-bold">{document.flashcards.length}</p>
              <p className="mt-1 text-xs text-muted-foreground">Flashcard</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-2xl font-bold">{document.quizzes.length}</p>
              <p className="mt-1 text-xs text-muted-foreground">Quiz</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
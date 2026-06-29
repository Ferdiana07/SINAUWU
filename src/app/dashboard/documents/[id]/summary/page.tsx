import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopHeader } from "@/components/top-header";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Lightbulb,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SummaryPage({ params }: PageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
  const { id } = await params;

  const document = await prisma.document.findUnique({
    where: { id },
    include: { summary: true },
  });

  // Document not found or doesn't belong to user
  if (!document || document.userId !== userId) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <TopHeader
        title="Rangkuman"
        description={document.title}
        actions={
          <Button variant="outline" asChild className="text-xs sm:text-sm">
            <Link href={`/dashboard/documents/${document.id}`}>
              <ArrowLeft className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Kembali</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        }
      />

      {!document.summary ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10 sm:py-16">
            <div className="mb-4 sm:mb-6 flex h-16 sm:h-20 w-16 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
              <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">Rangkuman belum dibuat</h3>
            <p className="mt-2 max-w-sm text-center text-muted-foreground text-sm px-4">
              Buat rangkuman dari dokumen ini untuk memulai belajar dengan lebih cepat.
            </p>
            <Button asChild className="mt-4 sm:mt-6 text-sm">
              <Link href={`/dashboard/documents/${document.id}`}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Rangkuman
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Short Summary */}
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg">Ringkasan Singkat</CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Poin utama dari dokumen
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4 sm:p-6 dark:from-blue-950/20 dark:to-cyan-950/20">
                <p className="leading-relaxed text-foreground text-sm sm:text-base">
                  {document.summary.shortSummary}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Summary */}
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg shadow-violet-500/25">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg">Penjelasan Lengkap</CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Penjelasan detail dari materi
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              {document.summary.detailedSummary ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p className="leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                    {document.summary.detailedSummary}
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 sm:p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    Tidak ada penjelasan lengkap yang tersedia.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Key Points */}
          {document.summary.keyPoints && (
            <Card className="border-border/50">
              <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
                    <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg">Point Penting</CardTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Poin-poin kunci yang perlu diingat
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="space-y-2 sm:space-y-3">
                  {Array.isArray(document.summary.keyPoints) ? (
                    (document.summary.keyPoints as string[]).map((point, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 sm:gap-3 rounded-xl bg-amber-50 p-3 sm:p-4 dark:bg-amber-950/20"
                      >
                        <div className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-[10px] sm:text-xs font-bold text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                          {index + 1}
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed">{point}</p>
                      </div>
                    ))
                  ) : (
                    <pre className="overflow-x-auto rounded-xl bg-muted p-4 text-xs sm:text-sm">
                      {JSON.stringify(document.summary.keyPoints, null, 2)}
                    </pre>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500 shrink-0" />
              <span>Rangkuman dibuat pada {document.summary.createdAt.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

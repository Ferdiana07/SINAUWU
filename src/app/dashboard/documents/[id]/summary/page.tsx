import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
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
  const { id } = await params;

  const document = await prisma.document.findUnique({
    where: { id },
    include: { summary: true },
  });

  if (!document) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <TopHeader
        title="Rangkuman"
        description={document.title}
        actions={
          <Button variant="outline" asChild>
            <Link href={`/dashboard/documents/${document.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Link>
          </Button>
        }
      />

      {!document.summary ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
              <FileText className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">Summary belum dibuat</h3>
            <p className="mt-2 max-w-sm text-center text-muted-foreground">
              Buat rangkuman dari dokumen ini untuk memulai belajar dengan lebih cepat.
            </p>
            <Button asChild className="mt-6">
              <Link href={`/dashboard/documents/${document.id}`}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Summary
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Short Summary */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Ringkasan Singkat</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Poin utama dari dokumen
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 dark:from-blue-950/20 dark:to-cyan-950/20">
                <p className="leading-relaxed text-foreground">
                  {document.summary.shortSummary}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Summary */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg shadow-violet-500/25">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Penjelasan Lengkap</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Penjelasan detail dari materi
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {document.summary.detailedSummary ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {document.summary.detailedSummary}
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
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
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
                    <Lightbulb className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Point Penting</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Poin-poin kunci yang perlu diingat
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.isArray(document.summary.keyPoints) ? (
                    (document.summary.keyPoints as string[]).map((point, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-xl bg-amber-50 p-4 dark:bg-amber-950/20"
                      >
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-relaxed">{point}</p>
                      </div>
                    ))
                  ) : (
                    <pre className="overflow-x-auto rounded-xl bg-muted p-4 text-sm">
                      {JSON.stringify(document.summary.keyPoints, null, 2)}
                    </pre>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
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
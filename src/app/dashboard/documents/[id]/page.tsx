import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GenerateSummaryButton from "@/components/generate-summary-button";
import GenerateFlashcardsButton from "@/components/generate-flashcards-button";
import GenerateQuizButton from "@/components/generate-quiz-button";
import DeleteDocumentButton from "@/components/delete-document-button";

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
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
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.1),_transparent_45%)] p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-red-900">Dokumen Tidak Ditemukan</h1>
            <p className="mt-2 text-red-700">Dokumen yang kamu cari tidak ada atau sudah dihapus.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/documents">Kembali ke Dokumen</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_45%)] p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Button variant="ghost" asChild className="mb-3 -ml-2">
              <Link href="/dashboard/documents">Kembali ke Dokumen</Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{document.title}</h1>
            <p className="mt-2 text-sm text-slate-600">{document.fileName}</p>
          </div>
          <DeleteDocumentButton documentId={document.id} />
        </div>

        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="px-6 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Status Dokumen</p>
                <div className="mt-2">
                  {document.status === "PROCESSED" ? (
                    <Badge className="bg-emerald-100 text-emerald-800">✓ Diproses</Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-800">⏳ Menunggu</Badge>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Upload</p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {document.createdAt.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-slate-900">Pilih Cara Belajar</h2>

          <div className="grid items-stretch gap-6 md:grid-cols-3">
            <Card className="h-full border-0 shadow-sm transition hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Rangkuman</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col space-y-4">
                <p className="text-sm text-slate-600">Baca penjelasan ringkas yang mudah dipahami sebelum masuk ke materi lebih dalam.</p>
                {document.summary ? (
                  <Button asChild className="mt-auto w-full bg-blue-600 hover:bg-blue-700">
                    <Link href={`/dashboard/documents/${document.id}/summary`}>Buka Rangkuman</Link>
                  </Button>
                ) : (
                  <GenerateSummaryButton documentId={document.id} fullWidth />
                )}
              </CardContent>
            </Card>

            <Card className="h-full border-0 shadow-sm transition hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Flashcard</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col space-y-4">
                <p className="text-sm text-slate-600">Latih hafalan dengan kartu interaktif yang memudahkan review materi.</p>
                {document.flashcards.length > 0 ? (
                  <Button asChild className="mt-auto w-full bg-violet-600 hover:bg-violet-700">
                    <Link href={`/dashboard/documents/${document.id}/flashcards`}>Buka Flashcard</Link>
                  </Button>
                ) : (
                  <GenerateFlashcardsButton documentId={document.id} fullWidth />
                )}
              </CardContent>
            </Card>

            <Card className="h-full border-0 shadow-sm transition hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quiz</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col space-y-4">
                <p className="text-sm text-slate-600">Uji pemahaman dengan soal latihan langsung dari materi yang kamu upload.</p>
                {document.quizzes.length > 0 ? (
                  <Button asChild className="mt-auto w-full bg-emerald-600 hover:bg-emerald-700">
                    <Link href={`/dashboard/documents/${document.id}/quiz`}>Buka Quiz</Link>
                  </Button>
                ) : (
                  <GenerateQuizButton documentId={document.id} fullWidth />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

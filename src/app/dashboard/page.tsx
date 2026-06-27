import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const documents = await prisma.document.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const totalDocuments = await prisma.document.count();
  const totalFlashcards = await prisma.flashcard.count();
  const totalQuizzes = await prisma.quiz.count();

  const stats = [
    {
      title: "Total Dokumen",
      value: totalDocuments.toString(),
      description: "PDF materi yang telah kamu upload.",
      accent: "from-sky-500 to-blue-600",
    },
    {
      title: "Flashcard",
      value: totalFlashcards.toString(),
      description: "Kartu belajar siap dipakai untuk menghafal.",
      accent: "from-violet-500 to-purple-600",
    },
    {
      title: "Quiz",
      value: totalQuizzes.toString(),
      description: "Latihan soal yang tersedia untuk evaluasi.",
      accent: "from-emerald-500 to-green-600",
    },
  ];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_45%)] p-6 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <Badge variant="outline" className="bg-slate-50">
                Dashboard
              </Badge>
              <h1 className="mt-4 text-3xl font-bold tracking-tight">Dashboard SINAUWU</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                Kelola materi kuliah, rangkuman, flashcard, dan quiz dengan pengalaman yang lebih rapi dan fokus.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" asChild>
                <Link href="/dashboard/documents">Lihat Dokumen</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard/upload">Upload PDF</Link>
              </Button>
            </div>
          </div>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <Card key={item.title} className="overflow-hidden border-0 shadow-sm">
              <div className={`h-1.5 bg-gradient-to-r ${item.accent}`} />
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{item.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-8">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Dokumen Terbaru</CardTitle>
                <Button variant="link" className="px-0" asChild>
                  <Link href="/dashboard/documents">Lihat semua</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {documents.length === 0 ? (
                <div className="rounded-2xl border border-dashed bg-slate-50 p-8 text-center">
                  <p className="font-medium">Belum ada dokumen</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Setelah kamu upload PDF, dokumen terbaru akan muncul di sini.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {documents.map((document) => (
                    <Link
                      key={document.id}
                      href={`/dashboard/documents/${document.id}`}
                      className="block rounded-2xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-semibold">{document.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{document.fileName}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">{document.status}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {document.createdAt.toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

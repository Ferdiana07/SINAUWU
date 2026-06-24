import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const documents = await prisma.document.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalDocuments = await prisma.document.count();
  const totalFlashcards = await prisma.flashcard.count();
  const totalQuizzes = await prisma.quiz.count();

  const stats = [
    {
      title: "Total Dokumen",
      value: totalDocuments.toString(),
      description: "PDF materi yang sudah kamu upload.",
    },
    {
      title: "Flashcard",
      value: totalFlashcards.toString(),
      description: "Kartu belajar yang sudah dibuat.",
    },
    {
      title: "Quiz",
      value: totalQuizzes.toString(),
      description: "Latihan soal yang tersedia.",
    },
  ];

  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-center">
          <div>
            <Badge variant="outline">Dashboard</Badge>
            <h1 className="mt-4 text-3xl font-bold">Dashboard SINAUWU</h1>
            <p className="mt-2 text-muted-foreground">
              Kelola materi kuliah, rangkuman, flashcard, dan quiz kamu di sini.
            </p>
          </div>

          <Button asChild>
            <Link href="/dashboard/upload">Upload PDF</Link>
          </Button>
        </div>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {stats.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{item.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Dokumen Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              {documents.length === 0 ? (
                <p className="text-muted-foreground">
                  Belum ada dokumen. Nanti dokumen yang kamu upload akan muncul
                  di bagian ini.
                </p>
              ) : (
                <div className="space-y-4">
                  {documents.map((document) => (
                    <div
                      key={document.id}
                      className="rounded-xl border p-4 transition hover:bg-muted/50"
                    >
                      <h3 className="font-semibold">{document.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {document.fileName}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="secondary">{document.status}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {document.createdAt.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
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

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FlashcardsPage({ params }: PageProps) {
  const { id } = await params;

  const document = await prisma.document.findUnique({
    where: { id },
    include: { flashcards: true },
  });

  if (!document) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.08),_transparent_45%)] p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <Button variant="ghost" asChild className="-ml-2 mb-3">
            <Link href={`/dashboard/documents/${document.id}`}>← Kembali</Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Flashcard</h1>
          <p className="mt-2 text-sm text-muted-foreground">{document.title}</p>
        </div>

        {document.flashcards.length === 0 ? (
          <Card className="border-dashed shadow-sm">
            <CardContent className="p-8 text-center">
              <p className="text-lg font-medium">Belum ada flashcard</p>
              <p className="mt-2 text-sm text-muted-foreground">Buat flashcard dari dokumen ini untuk memudahkan review materi.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {document.flashcards.map((card) => (
              <Card key={card.id} className="border-0 shadow-sm">
                <CardContent className="space-y-3 p-5">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Pertanyaan</p>
                    <p className="mt-2 font-medium text-slate-900">{card.question}</p>
                  </div>
                  <div className="rounded-xl bg-violet-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">Jawaban</p>
                    <p className="mt-2 text-slate-800">{card.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
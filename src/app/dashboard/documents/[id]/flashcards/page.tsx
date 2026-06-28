import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TopHeader } from "@/components/top-header";
import { FlashcardItem } from "@/components/flashcard-item";
import {
  ArrowLeft,
  Layers,
  Sparkles,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
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
    <div className="space-y-6">
      <TopHeader
        title="Flashcard"
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

      {document.flashcards.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10">
              <Layers className="h-10 w-10 text-violet-600" />
            </div>
            <h3 className="text-xl font-semibold">Belum ada flashcard</h3>
            <p className="mt-2 max-w-sm text-center text-muted-foreground">
              Buat flashcard dari dokumen ini untuk memudahkan review materi.
            </p>
            <Button asChild className="mt-6">
              <Link href={`/dashboard/documents/${document.id}`}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Flashcard
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Instructions */}
          <Card className="border-border/50 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
                    <Layers className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <p className="font-medium">{document.flashcards.length} Flashcard</p>
                    <p className="text-sm text-muted-foreground">
                      Klik kartu untuk melihat jawaban
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flashcards Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {document.flashcards.map((card, index) => (
              <FlashcardItem
                key={card.id}
                card={card}
                index={index}
              />
            ))}
          </div>

          {/* Tips */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">TIPS BELAJAR</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-violet-500">•</span>
                  Baca pertanyaan dan coba jawab sendiri sebelum membalik kartu
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-500">•</span>
                  Ulangi kartu yang salah beberapa kali sampai hafal
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-500">•</span>
                  Belajar dalam sesi pendek lebih efektif daripada satu sesi panjang
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
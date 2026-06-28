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
          <Button variant="outline" asChild className="text-xs sm:text-sm">
            <Link href={`/dashboard/documents/${document.id}`}>
              <ArrowLeft className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Kembali</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        }
      />

      {document.flashcards.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10 sm:py-16">
            <div className="mb-4 sm:mb-6 flex h-16 sm:h-20 w-16 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10">
              <Layers className="h-8 w-8 sm:h-10 sm:w-10 text-violet-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">Belum ada flashcard</h3>
            <p className="mt-2 max-w-sm text-center text-muted-foreground text-sm px-4">
              Buat flashcard dari dokumen ini untuk memudahkan review materi.
            </p>
            <Button asChild className="mt-4 sm:mt-6 text-sm">
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
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
                    <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">{document.flashcards.length} Flashcard</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Klik kartu untuk melihat jawaban
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flashcards Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <CardContent className="p-4 sm:p-6">
              <h3 className="mb-2 sm:mb-3 text-xs sm:text-sm font-semibold text-muted-foreground">TIPS BELAJAR</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-violet-500 flex-shrink-0">•</span>
                  <span>Baca pertanyaan dan coba jawab sendiri sebelum membalik kartu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-500 flex-shrink-0">•</span>
                  <span>Ulangi kartu yang salah beberapa kali sampai hafal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-500 flex-shrink-0">•</span>
                  <span>Belajar dalam sesi pendek lebih efektif daripada satu sesi panjang</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
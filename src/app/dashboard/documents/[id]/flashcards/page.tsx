import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FlashcardsPage(
  { params }: PageProps
) {
  const { id } = await params;

  const document =
    await prisma.document.findUnique({
      where: {
        id,
      },
      include: {
        flashcards: true,
      },
    });

  if (!document) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Flashcards
        </h1>

        <p className="text-muted-foreground">
          {document.title}
        </p>
      </div>

      {document.flashcards.length === 0 ? (
        <div>
          Belum ada flashcard.
        </div>
      ) : (
        <div className="space-y-4">
          {document.flashcards.map(
            (card) => (
              <div
                key={card.id}
                className="border rounded-lg p-4"
              >
                <h2 className="font-semibold">
                  Q: {card.question}
                </h2>

                <p className="mt-2">
                  A: {card.answer}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
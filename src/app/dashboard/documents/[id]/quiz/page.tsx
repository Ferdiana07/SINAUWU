import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import QuizPlayer
from "@/components/quiz-player";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuizPage(
  { params }: PageProps
) {
  const { id } = await params;

  const document =
    await prisma.document.findUnique({
      where: {
        id,
      },

      include: {
        quizzes: {
          include: {
            questions: true,
          },

          orderBy: {
            createdAt: "desc",
          },

          take: 1,
        },
      },
    });

  if (!document) {
    notFound();
  }

  const quiz =
    document.quizzes[0];

  if (!quiz) {
    return (
      <div>
        Belum ada quiz.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          {quiz.title}
        </h1>

        <p className="text-muted-foreground">
          {document.title}
        </p>
      </div>

      <QuizPlayer
        questions={quiz.questions}
        />
    </div>
  );
}
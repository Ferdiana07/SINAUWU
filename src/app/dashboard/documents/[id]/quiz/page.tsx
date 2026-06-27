import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import QuizPlayer
from "@/components/quiz-player";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
            attempts: {
              orderBy: {
                createdAt: "desc",
              },
              take: 10,
            },
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

  const questions = quiz.questions.map((question) => ({
    id: question.id,
    question: question.question,
    optionA: question.optionA,
    optionB: question.optionB,
    optionC: question.optionC,
    optionD: question.optionD,
  }));

  return (
    <div className="space-y-6">

      <div>
        <Button
          variant="ghost"
          asChild
          className="-ml-2 mb-3"
        >
          <Link href={`/dashboard/documents/${document.id}`}>
            ← Kembali
          </Link>
        </Button>

        <h1 className="text-3xl font-bold">
          {quiz.title}
        </h1>

        <p className="text-muted-foreground">
          {document.title}
        </p>
      </div>

      <QuizPlayer
        quizId={quiz.id}
        questions={questions}
        />

      <Card>
        <CardHeader>
          <CardTitle>
            Riwayat Pengerjaan
          </CardTitle>
        </CardHeader>

        <CardContent>
          {quiz.attempts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Belum ada riwayat pengerjaan quiz.
            </p>
          ) : (
            <div className="space-y-3">
              {quiz.attempts.map((attempt, index) => (
                <div
                  key={attempt.id}
                  className="flex flex-col gap-1 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">
                      Attempt #{quiz.attempts.length - index}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {attempt.createdAt.toLocaleString("id-ID")}
                    </p>
                  </div>

                  <p className="font-semibold">
                    Score: {attempt.score}/{quiz.questions.length}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

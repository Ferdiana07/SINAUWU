import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopHeader } from "@/components/top-header";
import { Badge } from "@/components/ui/badge";
import QuizPlayer from "@/components/quiz-player";
import {
  ArrowLeft,
  ClipboardList,
  Sparkles,
  Target,
  Clock,
  Trophy,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function QuizPage({ params }: PageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
  const { id } = await params;

  const document = await prisma.document.findUnique({
    where: { id },
    include: {
      quizzes: {
        include: {
          questions: true,
          attempts: {
            orderBy: { createdAt: "desc" },
            take: 10,
          },
        },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!document || document.userId !== userId) {
    notFound();
  }

  const quiz = document.quizzes[0];

  return (
    <div className="space-y-4 sm:space-y-6">
      <TopHeader
        title="Quiz"
        description={document.title}
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/documents/${document.id}`}>
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </Button>
        }
      />

      {!quiz ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
            <ClipboardList className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-600 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold">Belum ada quiz</h3>
            <p className="text-xs sm:text-sm text-muted-foreground text-center mt-1 px-4">
              Buat quiz dari dokumen ini untuk menguji pemahamanmu.
            </p>
            <Button asChild size="sm" className="mt-4">
              <Link href={`/dashboard/documents/${document.id}`}>
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                Generate
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {/* Quiz Player - Full width on mobile */}
          <QuizPlayer
            quizId={quiz.id}
            questions={quiz.questions.map((question) => ({
              id: question.id,
              question: question.question,
              optionA: question.optionA,
              optionB: question.optionB,
              optionC: question.optionC,
              optionD: question.optionD,
            }))}
          />

          {/* Quiz Info - Below quiz on mobile, side on lg+ */}
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
            {/* Stats */}
            <Card className="border-border/50">
              <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-4">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  Info Quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-4 space-y-3">
                <p className="text-xs sm:text-sm font-medium truncate">{quiz.title}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-muted/50 p-2 sm:p-3 text-center">
                    <Target className="mx-auto h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mb-1" />
                    <p className="text-sm sm:text-base font-bold">{quiz.questions.length}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Soal</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2 sm:p-3 text-center">
                    <Clock className="mx-auto h-4 w-4 sm:h-5 sm:w-5 text-violet-600 mb-1" />
                    <p className="text-sm sm:text-base font-bold">{quiz.attempts.length}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Attempt</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Score */}
            {quiz.attempts.length > 0 && (
              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 dark:border-emerald-800 dark:from-emerald-950/30 dark:to-teal-950/30">
                <CardHeader className="pb-2 px-3 sm:px-4">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    Skor Terbaik
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {Math.max(...quiz.attempts.map((a) => a.score))}/{quiz.questions.length}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                    {Math.round((Math.max(...quiz.attempts.map((a) => a.score)) / quiz.questions.length) * 100)}% benar
                  </p>
                </CardContent>
              </Card>
            )}

            {/* History */}
            <Card className="border-border/50 lg:col-span-2">
              <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-4">
                <CardTitle className="text-sm sm:text-base">Riwayat</CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
                {quiz.attempts.length === 0 ? (
                  <p className="text-xs sm:text-sm text-muted-foreground text-center py-2">
                    Belum ada riwayat
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {quiz.attempts.slice(0, 5).map((attempt, index) => {
                      const percentage = Math.round((attempt.score / quiz.questions.length) * 100);
                      return (
                        <div key={attempt.id}
                          className="flex items-center gap-1.5 sm:gap-2 rounded-lg bg-muted/50 px-2 sm:px-3 py-1.5 sm:py-2">
                          <span className="text-[10px] sm:text-xs font-medium">#{quiz.attempts.length - index}</span>
                          <Badge variant={percentage >= 70 ? "default" : "secondary"} className="text-[10px] sm:text-xs">
                            {percentage}%
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

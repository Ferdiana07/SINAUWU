import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
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

  if (!document) {
    notFound();
  }

  const quiz = document.quizzes[0];

  return (
    <div className="space-y-6">
      <TopHeader
        title="Quiz"
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

      {!quiz ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10 sm:py-16">
            <div className="mb-4 sm:mb-6 flex h-16 sm:h-20 w-16 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
              <ClipboardList className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">Belum ada quiz</h3>
            <p className="mt-2 max-w-sm text-center text-muted-foreground text-sm px-4">
              Buat quiz dari dokumen ini untuk menguji pemahamanmu.
            </p>
            <Button asChild className="mt-4 sm:mt-6 text-sm">
              <Link href={`/dashboard/documents/${document.id}`}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Quiz
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quiz Player */}
          <div className="lg:col-span-2">
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
          </div>

          {/* Quiz Info Sidebar */}
          <div className="space-y-4">
            {/* Quiz Stats */}
            <Card className="border-border/50">
              <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
                <CardTitle className="text-sm sm:text-base">Info Quiz</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                    <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{quiz.title}</p>
                    <p className="text-xs text-muted-foreground">{quiz.questions.length} pertanyaan</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="rounded-lg bg-muted/50 p-2.5 sm:p-3 text-center">
                    <Target className="mx-auto mb-1 h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    <p className="text-base sm:text-lg font-bold">{quiz.questions.length}</p>
                    <p className="text-xs text-muted-foreground">Soal</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2.5 sm:p-3 text-center">
                    <Clock className="mx-auto mb-1 h-4 w-4 sm:h-5 sm:w-5 text-violet-600" />
                    <p className="text-base sm:text-lg font-bold">{quiz.attempts.length}</p>
                    <p className="text-xs text-muted-foreground">Attempt</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Score */}
            {quiz.attempts.length > 0 && (
              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 dark:border-emerald-800 dark:from-emerald-950/30 dark:to-teal-950/30">
                <CardHeader className="pb-2 px-4 sm:px-6">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    Skor Terbaik
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {Math.max(...quiz.attempts.map((a) => a.score))}/{quiz.questions.length}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                    {Math.round((Math.max(...quiz.attempts.map((a) => a.score)) / quiz.questions.length) * 100)}% benar
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quiz History */}
            <Card className="border-border/50">
              <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
                <CardTitle className="text-sm sm:text-base">Riwayat Pengerjaan</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                {quiz.attempts.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Belum ada riwayat pengerjaan
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {quiz.attempts.slice(0, 5).map((attempt, index) => {
                      const percentage = Math.round((attempt.score / quiz.questions.length) * 100);
                      return (
                        <div
                          key={attempt.id}
                          className="flex items-center justify-between rounded-lg bg-muted/30 p-2.5 sm:p-3"
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-muted text-[10px] sm:text-xs font-medium">
                              {quiz.attempts.length - index}
                            </span>
                            <span className="text-xs sm:text-sm">
                              {attempt.createdAt.toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                          </div>
                          <Badge
                            variant={percentage >= 70 ? "default" : "secondary"}
                            className={percentage >= 70 ? "bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs" : "text-[10px] sm:text-xs"}
                          >
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
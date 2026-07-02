import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  Layers,
  Clock,
  Upload,
  BookOpen,
  Brain,
  Target,
  ArrowUpRight,
} from "lucide-react";
import { WelcomeBanner } from "@/components/welcome-banner";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const [documents, totalDocuments, totalFlashcards, totalQuizzes, totalSummaries, recentQuizAttempts] = await Promise.all([
    prisma.document.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        summary: true,
        quizzes: { include: { attempts: { take: 1, orderBy: { createdAt: "desc" } } } },
      },
    }),
    prisma.document.count({ where: { userId } }),
    prisma.flashcard.count({ where: { document: { userId } } }),
    prisma.quiz.count({ where: { document: { userId } } }),
    prisma.summary.count({ where: { document: { userId } } }),
    prisma.quizAttempt.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { quiz: { include: { document: true } } },
    }),
  ]);

  const allAttempts = await prisma.quizAttempt.findMany({ where: { userId } });
  const averageScore = allAttempts.length > 0
    ? Math.round(allAttempts.reduce((acc, a) => acc + (a.score / 10) * 100, 0) / allAttempts.length)
    : 0;

  const stats = [
    { title: "Dokumen", value: totalDocuments, icon: FileText, bg: "bg-blue-500" },
    { title: "Rangkuman", value: totalSummaries, icon: BookOpen, bg: "bg-emerald-500" },
    { title: "Flashcard", value: totalFlashcards, icon: Layers, bg: "bg-violet-500" },
    { title: "Quiz", value: `${averageScore}%`, icon: Target, bg: "bg-amber-500" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <WelcomeBanner />

      {/* Stats - 2x2 grid on mobile, 4 on xl */}
      <section className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-border/50 bg-card">
              <CardContent className="p-2.5 sm:p-3 lg:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`${stat.bg} p-1.5 sm:p-2 rounded-lg flex-shrink-0`}>
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground truncate">{stat.title}</p>
                    <p className="text-base sm:text-lg lg:text-2xl font-bold truncate">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Documents */}
      <Card className="border-border/50">
        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm sm:text-base lg:text-lg">Dokumen Terbaru</CardTitle>
            <Link href="/dashboard/documents" className="text-[10px] sm:text-xs text-muted-foreground hover:text-foreground">
              Lihat semua <ArrowUpRight className="inline h-3 w-3" />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 lg:px-6">
          {documents.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4 sm:p-6 text-center">
              <FileText className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground mb-2 sm:mb-3" />
              <p className="text-xs sm:text-sm font-medium">Belum ada dokumen</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Upload PDF untuk memulai</p>
              <Link href="/dashboard/upload" className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 sm:gap-2 bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm">
                <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Upload
              </Link>
            </div>
          ) : (
            <div className="space-y-1 sm:space-y-2">
              {documents.map((doc) => (
                <Link key={doc.id} href={`/dashboard/documents/${doc.id}`}
                  className="flex items-center gap-2 sm:gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium truncate">{doc.title}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{doc.createdAt.toLocaleDateString("id-ID")}</p>
                  </div>
                  <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0 ${doc.summary ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {doc.summary ? "✓" : "New"}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activity - 2 columns on sm+, stacked on mobile */}
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
        {/* Quiz Activity */}
        <Card className="border-border/50">
          <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-4 lg:px-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm sm:text-base lg:text-lg">Aktivitas Quiz</CardTitle>
              <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="px-3 sm:px-4 lg:px-6">
            {recentQuizAttempts.length === 0 ? (
              <div className="text-center py-4">
                <Target className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mb-2" />
                <p className="text-[10px] sm:text-xs text-muted-foreground">Belum ada aktivitas</p>
              </div>
            ) : (
              <div className="space-y-1.5 sm:space-y-2">
                {recentQuizAttempts.map((attempt) => (
                  <div key={attempt.id} className="flex items-center gap-2 rounded-lg p-1.5 sm:p-2 hover:bg-muted/50">
                    <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                      <Brain className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-violet-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs font-medium truncate">{attempt.quiz.title}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Score: {attempt.score}/10</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress */}
        <Card className="border-border/50">
          <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-4 lg:px-6">
            <CardTitle className="text-sm sm:text-base lg:text-lg">Progress</CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-4 lg:px-6 space-y-2 sm:space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] sm:text-xs">
                <span className="text-muted-foreground">Dokumen</span>
                <span className="font-medium">{totalDocuments > 0 ? 100 : 0}%</span>
              </div>
              <div className="h-1.5 sm:h-2 rounded-full bg-muted">
                <div className="h-full rounded-full bg-blue-500" style={{ width: `${totalDocuments > 0 ? 100 : 0}%` }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] sm:text-xs">
                <span className="text-muted-foreground">Rangkuman</span>
                <span className="font-medium">{totalDocuments > 0 ? Math.round((totalSummaries / totalDocuments) * 100) : 0}%</span>
              </div>
              <div className="h-1.5 sm:h-2 rounded-full bg-muted">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${totalDocuments > 0 ? (totalSummaries / totalDocuments) * 100 : 0}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

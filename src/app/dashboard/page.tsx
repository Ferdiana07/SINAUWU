import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  Layers,
  TrendingUp,
  Clock,
  Upload,
  BookOpen,
  Brain,
  Target,
  ArrowUpRight,
} from "lucide-react";
import { Sparkline } from "@/components/charts";
import { WelcomeBanner } from "@/components/welcome-banner";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Get authenticated user
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  // Fetch user-specific data
  const [
    documents,
    totalDocuments,
    totalFlashcards,
    totalQuizzes,
    totalSummaries,
    recentQuizAttempts,
  ] = await Promise.all([
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

  // Calculate average quiz score
  const allAttempts = await prisma.quizAttempt.findMany({
    where: { userId },
  });
  const averageScore = allAttempts.length > 0
    ? Math.round(allAttempts.reduce((acc, a) => acc + (a.score / 10) * 100, 0) / allAttempts.length)
    : 0;

  // Generate sparkline data
  const documentsSparkline = [10, 15, 12, 18, 20, 25, 22];
  const summarySparkline = [8, 12, 10, 15, 18, 20, 22];
  const flashcardsSparkline = [5, 8, 12, 15, 18, 22, 20];
  const quizSparkline = [60, 65, 70, 75, 80, 75, 85];

  const stats = [
    {
      title: "Total Dokumen",
      value: totalDocuments,
      change: totalDocuments > 0 ? "dokumen" : "Mulai upload",
      icon: FileText,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
      iconBg: "bg-blue-500",
      sparklineData: documentsSparkline,
    },
    {
      title: "Rangkuman",
      value: totalSummaries,
      change: totalSummaries > 0 ? "rangkuman dibuat" : "Generate sekarang",
      icon: BookOpen,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "bg-gradient-to-br from-emerald-500/10 to-teal-500/10",
      iconBg: "bg-emerald-500",
      sparklineData: summarySparkline,
    },
    {
      title: "Flashcard",
      value: totalFlashcards,
      change: `${Math.round((totalFlashcards / Math.max(totalDocuments, 1)) * 10)} rata-rata`,
      icon: Layers,
      gradient: "from-violet-500 to-purple-500",
      bgGradient: "bg-gradient-to-br from-violet-500/10 to-purple-500/10",
      iconBg: "bg-violet-500",
      sparklineData: flashcardsSparkline,
    },
    {
      title: "Quiz Score",
      value: `${averageScore}%`,
      change: totalQuizzes > 0 ? `${allAttempts.length} attempt` : "Belum ada",
      icon: Target,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "bg-gradient-to-br from-amber-500/10 to-orange-500/10",
      iconBg: "bg-amber-500",
      sparklineData: quizSparkline,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Stats Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/5">
              {/* Top gradient accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

              <CardContent className="relative p-4 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-3 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl sm:text-3xl font-bold tracking-tight">{stat.value}</p>
                    <div className="flex items-center gap-2">
                      {stat.change.includes("rata-rata") ? (
                        <TrendingUp className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                      ) : null}
                      <span className="text-xs text-muted-foreground truncate">{stat.change}</span>
                    </div>
                    {/* Sparkline */}
                    <div className="pt-1">
                      <Sparkline data={stat.sparklineData} color={stat.iconBg.replace("bg-", "var(--") + ")"} className="h-6 w-20" />
                    </div>
                  </div>
                  <div className={`rounded-xl ${stat.iconBg} p-2.5 sm:p-3 shadow-lg transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Recent Documents */}
        <div className="lg:col-span-2">
          {/* Recent Documents */}
          <Card className="border-border/50">
            <CardHeader className="pb-4 px-4 sm:px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg font-semibold">Dokumen Terbaru</CardTitle>
                <Link
                  href="/dashboard/documents"
                  className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Lihat semua
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              {documents.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 sm:p-8 text-center">
                  <div className="mx-auto mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-muted">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-sm sm:text-base">Belum ada dokumen</p>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                    Upload PDF pertama untuk memulai
                  </p>
                  <Link
                    href="/dashboard/upload"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Sekarang
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <Link
                      key={doc.id}
                      href={`/dashboard/documents/${doc.id}`}
                      className="group flex items-center gap-3 sm:gap-4 rounded-xl border border-transparent p-2.5 sm:p-3 transition-all hover:border-border hover:bg-muted/50"
                    >
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex-shrink-0">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium group-hover:text-blue-600 transition-colors">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.createdAt.toLocaleDateString("id-ID")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {doc.summary ? (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                            Summary
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                            Uploaded
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Activity */}
        <div className="space-y-6">
          {/* Recent Quiz Activity */}
          <Card className="border-border/50">
            <CardHeader className="pb-4 px-4 sm:px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg font-semibold">Aktivitas Quiz</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              {recentQuizAttempts.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4 sm:p-6 text-center">
                  <div className="mx-auto mb-3 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-muted">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium">Belum ada aktivitas quiz</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Selesaikan quiz untuk melihat progress
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {recentQuizAttempts.map((attempt) => (
                    <div
                      key={attempt.id}
                      className="flex items-center gap-3 sm:gap-4 rounded-xl p-2.5 sm:p-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-violet-500/10 flex-shrink-0">
                        <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-violet-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-xs sm:text-sm font-medium">{attempt.quiz.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Score: {attempt.score}/10
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                        {new Date(attempt.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Learning Progress */}
          <Card className="border-border/50">
            <CardHeader className="pb-4 px-4 sm:px-6">
              <CardTitle className="text-base sm:text-lg font-semibold">Progress Belajar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-4 sm:px-6">
              {/* Progress Items */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Dokumen Diproses</span>
                    <span className="font-medium">{totalDocuments > 0 ? 100 : 0}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                      style={{ width: `${totalDocuments > 0 ? 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Rangkuman Dibuat</span>
                    <span className="font-medium">
                      {totalDocuments > 0 ? Math.round((totalSummaries / totalDocuments) * 100) : 0}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                      style={{ width: `${totalDocuments > 0 ? (totalSummaries / totalDocuments) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Flashcard Dibuat</span>
                    <span className="font-medium">
                      {totalDocuments > 0 ? Math.min(100, Math.round((totalFlashcards / Math.max(totalDocuments * 10, 1)) * 100)) : 0}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${totalDocuments > 0 ? Math.min(100, (totalFlashcards / Math.max(totalDocuments * 10, 1)) * 100) : 0}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* CTA */}
              {totalDocuments === 0 && (
                <div className="rounded-xl border border-dashed border-border bg-gradient-to-br from-blue-50 to-cyan-50 p-3 sm:p-4 text-center dark:from-blue-950/30 dark:to-cyan-950/30">
                  <Sparkles className="mx-auto mb-2 h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  <p className="text-xs sm:text-sm font-medium">Mulai perjalanan belajarmu</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Upload PDF untuk melihat progress
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopHeader } from "@/components/top-header";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  Layers,
  ClipboardList,
  TrendingUp,
  Clock,
  Upload,
  BookOpen,
  Brain,
  Target,
  ArrowUpRight,
} from "lucide-react";
import { Sparkline } from "@/components/charts";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Fetch all data
  const [
    documents,
    totalDocuments,
    totalFlashcards,
    totalQuizzes,
    totalSummaries,
    recentQuizAttempts,
  ] = await Promise.all([
    prisma.document.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        summary: true,
        quizzes: { include: { attempts: { take: 1, orderBy: { createdAt: "desc" } } } },
      },
    }),
    prisma.document.count(),
    prisma.flashcard.count(),
    prisma.quiz.count(),
    prisma.summary.count(),
    prisma.quizAttempt.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { quiz: { include: { document: true } } },
    }),
  ]);

  // Calculate average quiz score
  const allAttempts = await prisma.quizAttempt.findMany();
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
      change: totalDocuments > 0 ? "documents" : "Mulai upload",
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
      {/* Welcome Header */}
      <TopHeader
        title="Selamat Datang di Dashboard"
        description="Kelola semua materi belajar dan lacak progress belajarmu"
      />

      {/* Stats Cards */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/5">
              {/* Top gradient accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

              <CardContent className="relative p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                    <div className="flex items-center gap-2">
                      {stat.change.includes("rata-rata") || stat.change === "documents" ? (
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                      ) : null}
                      <span className="text-xs text-muted-foreground">{stat.change}</span>
                    </div>
                    {/* Sparkline */}
                    <div className="pt-1">
                      <Sparkline data={stat.sparklineData} color={stat.iconBg.replace("bg-", "var(--") + ")"} className="h-6 w-20" />
                    </div>
                  </div>
                  <div className={`rounded-xl ${stat.iconBg} p-3 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-5 w-5 text-white" />
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
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Dokumen Terbaru</CardTitle>
                <Link
                  href="/dashboard/documents"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Lihat semua
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {documents.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="font-medium">Belum ada dokumen</p>
                  <p className="mt-1 text-sm text-muted-foreground">
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
                      className="group flex items-center gap-4 rounded-xl border border-transparent p-3 transition-all hover:border-border hover:bg-muted/50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium group-hover:text-blue-600 transition-colors">
                          {doc.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {doc.createdAt.toLocaleDateString("id-ID")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.summary ? (
                          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            Summary
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
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
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Aktivitas Quiz</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              {recentQuizAttempts.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Target className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">Belum ada aktivitas quiz</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Selesaikan quiz untuk melihat progress
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {recentQuizAttempts.map((attempt) => (
                    <div
                      key={attempt.id}
                      className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/10">
                        <Brain className="h-4 w-4 text-violet-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium">{attempt.quiz.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Score: {attempt.score}/10
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
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
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Progress Belajar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Items */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
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
                  <div className="flex items-center justify-between text-sm">
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
                  <div className="flex items-center justify-between text-sm">
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
                <div className="rounded-xl border border-dashed border-border bg-gradient-to-br from-blue-50 to-cyan-50 p-4 text-center dark:from-blue-950/30 dark:to-cyan-950/30">
                  <Sparkles className="mx-auto mb-2 h-6 w-6 text-blue-600" />
                  <p className="text-sm font-medium">Mulai perjalanan belajarmu</p>
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
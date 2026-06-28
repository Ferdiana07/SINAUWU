import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TopHeader } from "@/components/top-header";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  Layers,
  ClipboardList,
  TrendingUp,
  Clock,
  ChevronRight,
  Upload,
  BookOpen,
  Brain,
  Target,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import { BarChart, DonutChart, LineChart, Sparkline } from "@/components/charts";

export const dynamic = "force-dynamic";

// Icon wrapper component for stats
function StatIcon({ icon: Icon, className }: { icon: React.ComponentType<{ className?: string }>; className?: string }) {
  return (
    <div className={`rounded-xl p-3 ${className}`}>
      <Icon className="h-5 w-5" />
    </div>
  );
}

// Quick Action Card Component
function QuickActionCard({
  title,
  description,
  href,
  icon: Icon,
  gradient,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5"
    >
      {/* Gradient accent */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />

      <div className="relative flex items-start gap-4">
        <div className={`rounded-xl bg-gradient-to-br ${gradient} p-3 shadow-lg`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

// Activity Item Component
function ActivityItem({
  title,
  subtitle,
  time,
  icon: Icon,
  color,
}: {
  title: string;
  subtitle: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted/50">
      <div className={`rounded-full p-2 ${color}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
    </div>
  );
}

export default async function DashboardPage() {
  // Fetch all data
  const [
    documents,
    totalDocuments,
    totalFlashcards,
    totalQuizzes,
    totalSummaries,
    recentQuizAttempts,
    recentDocuments,
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
    prisma.document.findMany({
      orderBy: { createdAt: "desc" },
      take: 7,
    }),
  ]);

  // Calculate average quiz score
  const allAttempts = await prisma.quizAttempt.findMany();
  const averageScore = allAttempts.length > 0
    ? Math.round(allAttempts.reduce((acc, a) => acc + (a.score / 10) * 100, 0) / allAttempts.length)
    : 0;

  // Generate chart data based on documents created in last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split("T")[0];
    return dateStr;
  });

  const documentsPerDay = last7Days.map((date) => ({
    label: date.split("-")[2],
    value: recentDocuments.filter((d) =>
      d.createdAt.toISOString().startsWith(date)
    ).length,
  }));

  // Mock quiz scores for chart (in real app, this would come from quiz attempts)
  const quizScoresPerDay = last7Days.map(() => ({
    label: "",
    value: Math.floor(Math.random() * 100) + 50,
  }));

  // Content distribution for donut chart
  const contentDistribution = [
    { label: "Summary", value: totalSummaries, color: "#3b82f6" },
    { label: "Flashcard", value: totalFlashcards, color: "#8b5cf6" },
    { label: "Quiz", value: totalQuizzes, color: "#10b981" },
  ];

  const stats = [
    {
      title: "Total Dokumen",
      value: totalDocuments,
      change: totalDocuments > 0 ? `${documentsPerDay.reduce((a, b) => a + b.value, 0)} minggu ini` : "Mulai upload",
      changeType: "positive" as const,
      icon: FileText,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
      iconBg: "bg-blue-500",
      sparklineData: documentsPerDay.map((d) => d.value),
    },
    {
      title: "Rangkuman",
      value: totalSummaries,
      change: totalSummaries > 0 ? "100% dibuat" : "Generate sekarang",
      changeType: totalSummaries > 0 ? "positive" as const : "neutral" as const,
      icon: BookOpen,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "bg-gradient-to-br from-emerald-500/10 to-teal-500/10",
      iconBg: "bg-emerald-500",
      sparklineData: [10, 15, 12, 18, 20, 25, 22],
    },
    {
      title: "Flashcard",
      value: totalFlashcards,
      change: `${Math.round((totalFlashcards / Math.max(totalDocuments, 1)) * 10)} rata-rata`,
      changeType: "neutral" as const,
      icon: Layers,
      gradient: "from-violet-500 to-purple-500",
      bgGradient: "bg-gradient-to-br from-violet-500/10 to-purple-500/10",
      iconBg: "bg-violet-500",
      sparklineData: [5, 8, 12, 15, 18, 22, 20],
    },
    {
      title: "Quiz Score",
      value: `${averageScore}%`,
      change: totalQuizzes > 0 ? `${allAttempts.length} attempt` : "Belum ada",
      changeType: averageScore >= 70 ? "positive" as const : "neutral" as const,
      icon: Target,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "bg-gradient-to-br from-amber-500/10 to-orange-500/10",
      iconBg: "bg-amber-500",
      sparklineData: [60, 65, 70, 75, 80, 75, 85],
    },
  ];

  const quickActions = [
    {
      title: "Upload Dokumen Baru",
      description: "Tambah materi PDF untuk diproses AI",
      href: "/dashboard/upload",
      icon: Upload,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Lihat Dokumen",
      description: "Kelola semua materi yang sudah diupload",
      href: "/dashboard/documents",
      icon: FileText,
      gradient: "from-violet-500 to-purple-500",
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
                      {stat.changeType === "positive" && (
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                      )}
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

      {/* Charts Section */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Documents Upload Chart */}
        <div className="lg:col-span-2">
          <BarChart
            title="Dokumen Upload (7 Hari Terakhir)"
            data={documentsPerDay}
            height={200}
            showValues
          />
        </div>

        {/* Content Distribution */}
        <div>
          <DonutChart
            title="Distribusi Konten"
            data={contentDistribution}
            centerLabel="Total"
            centerValue={totalSummaries + totalFlashcards + totalQuizzes}
            size={180}
          />
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Quick Actions & Recent Activity */}
        <div className="space-y-6 lg:col-span-2">
          {/* Quick Actions */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Aksi Cepat</CardTitle>
                <Badge variant="secondary" className="text-xs">Shortcuts</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {quickActions.map((action) => (
                <QuickActionCard key={action.title} {...action} />
              ))}
            </CardContent>
          </Card>

          {/* Recent Documents */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Dokumen Terbaru</CardTitle>
                <Button variant="ghost" size="sm" asChild className="text-xs">
                  <Link href="/dashboard/documents">
                    Lihat semua <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
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
                  <Button asChild className="mt-4">
                    <Link href="/dashboard/upload">Upload Sekarang</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <Link
                      key={doc.id}
                      href={`/dashboard/documents/${doc.id}`}
                      className="group flex items-center gap-4 rounded-xl p-3 transition-all hover:bg-muted/50"
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
                        <Badge variant="secondary" className="text-xs">
                          {doc.status}
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Activity & Progress */}
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
                    <ActivityItem
                      key={attempt.id}
                      title={`Quiz: ${attempt.quiz.title}`}
                      subtitle={`Score: ${attempt.score}/10`}
                      time={new Date(attempt.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                      icon={Brain}
                      color="bg-violet-500/10 text-violet-600"
                    />
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
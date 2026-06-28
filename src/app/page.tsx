import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  FileText,
  Layers,
  ClipboardList,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    title: "PDF Summary",
    description: "Ubah materi kuliah panjang menjadi rangkuman yang lebih singkat, jelas, dan mudah dipahami.",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500",
  },
  {
    title: "Flashcard Generator",
    description: "Buat kartu tanya-jawab otomatis untuk membantu mengingat konsep penting dari materi.",
    icon: Layers,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500",
  },
  {
    title: "Quiz Practice",
    description: "Latihan soal pilihan ganda otomatis berdasarkan isi PDF yang kamu upload.",
    icon: ClipboardList,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Hemat Waktu",
    description: "Tidak perlu baca ratusan halaman untuk paham satu topik",
  },
  {
    icon: Sparkles,
    title: "Powered by AI",
    description: "Rangkuman, flashcard, dan quiz dibuat secara otomatis oleh AI",
  },
  {
    icon: Shield,
    title: "Aman & Privasi",
    description: "Dokumenmu hanya untukmu, tidak dibagikan ke siapapun",
  },
  {
    icon: Zap,
    title: "Cepat & Instan",
    description: "Hasil langsung bisa dilihat dalam hitungan detik",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight">SINAUWU</span>
          </div>
          <Button asChild className="text-sm sm:text-base">
            <a href="/dashboard">Mulai Belajar</a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.06),transparent_40%)]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 sm:mb-6 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm">
              <Sparkles className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
              AI Learning Assistant for Students
            </Badge>

            <h1 className="mx-auto max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
              Belajar Lebih{" "}
              <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                Pintar
              </span>{" "}
              dengan AI
            </h1>

            <p className="mx-auto mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl leading-7 sm:leading-8 text-muted-foreground px-2">
              Upload PDF materi kuliahmu, lalu ubah menjadi rangkuman, flashcard,
              dan kuis latihan dengan bantuan AI. Belajar lebih efisien kapan saja.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3 sm:gap-4">
              <Button asChild size="lg" className="h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base shadow-lg shadow-violet-500/25 w-full sm:w-auto">
                <a href="/dashboard">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button asChild size="lg" variant="outline" className="h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base w-full sm:w-auto">
                <a href="#features">Lihat Fitur</a>
              </Button>
            </div>
          </div>

          {/* Floating UI Preview - Hidden on small mobile */}
          <div className="mt-16 sm:mt-20 hidden sm:flex justify-center">
            <div className="relative w-full max-w-4xl">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <div className="rounded-2xl border border-border/50 bg-card shadow-2xl shadow-black/10">
                <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="grid grid-cols-3 gap-4 p-6">
                  <div className="space-y-2 rounded-xl bg-muted/50 p-4">
                    <div className="h-4 w-20 rounded bg-muted" />
                    <div className="h-8 w-12 rounded bg-violet-500/20" />
                    <div className="h-3 w-28 rounded bg-muted" />
                  </div>
                  <div className="space-y-2 rounded-xl bg-muted/50 p-4">
                    <div className="h-4 w-20 rounded bg-muted" />
                    <div className="h-8 w-12 rounded bg-emerald-500/20" />
                    <div className="h-3 w-24 rounded bg-muted" />
                  </div>
                  <div className="space-y-2 rounded-xl bg-muted/50 p-4">
                    <div className="h-4 w-20 rounded bg-muted" />
                    <div className="h-8 w-12 rounded bg-blue-500/20" />
                    <div className="h-3 w-16 rounded bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 sm:mb-16 text-center">
            <Badge variant="outline" className="mb-3 sm:mb-4 text-xs sm:text-sm">
              Fitur Unggulan
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Semua yang Kamu Butuhkan untuk Belajar
            </h2>
            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground px-2">
              SINAUWU menyediakan berbagai tools AI untuk membantumu memahami materi lebih cepat dan efektif.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/5"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />

                  <CardHeader className="pb-2 px-4 sm:px-6">
                    <div className={`inline-flex w-fit rounded-xl ${feature.bgColor} p-2.5 sm:p-3 shadow-lg`}>
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </CardHeader>

                  <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <CardTitle className="mb-2 text-lg sm:text-xl">{feature.title}</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <Badge variant="outline" className="mb-3 sm:mb-4 text-xs sm:text-sm">
                Kenapa SINAUWU?
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Dirancang untuk Mahasiswa
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
                Dengan SINAUWU, kamu bisa belajar lebih efisien tanpa harus menghabiskan waktu membaca materi yang panjang.
              </p>

              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={benefit.title} className="flex items-start gap-3 sm:gap-4">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base">{benefit.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button asChild className="mt-6 sm:mt-8 text-sm sm:text-base">
                <a href="/dashboard">
                  Coba Sekarang
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 order-1 lg:order-2">
              <Card className="border-border/50 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
                <CardContent className="p-4 sm:p-6">
                  <p className="text-3xl sm:text-4xl font-bold text-violet-600 dark:text-violet-400">3</p>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Tools AI</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                <CardContent className="p-4 sm:p-6">
                  <p className="text-2xl sm:text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">PDF</p>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Materi Supported</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
                <CardContent className="p-4 sm:p-6">
                  <p className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">100%</p>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Gratis</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                <CardContent className="p-4 sm:p-6">
                  <p className="text-2xl sm:text-3xl sm:text-4xl font-bold text-amber-600 dark:text-amber-400">24/7</p>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Akses</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-violet-600 to-purple-700">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />

            <CardContent className="relative p-6 sm:p-10 md:p-12 text-center text-white">
              <Sparkles className="mx-auto mb-3 sm:mb-4 h-10 w-10 sm:h-12 sm:w-12" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Siap Memulai Perjalanan Belajarmu?
              </h2>
              <p className="mx-auto mt-3 sm:mt-4 max-w-lg text-sm sm:text-base md:text-lg text-white/80">
                Upload PDF pertamamu dan rasakan kemudahan belajar dengan bantuan AI.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 sm:mt-8 h-10 sm:h-12 bg-white px-6 sm:px-8 text-sm sm:text-base text-violet-700 hover:bg-white/90"
              >
                <a href="/dashboard">
                  Upload PDF Sekarang
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-center md:text-left">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="font-semibold text-sm sm:text-base">SINAUWU</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Powered by AI • Built for Students
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
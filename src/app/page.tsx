"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  FileText,
  Layers,
  ClipboardList,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Play,
} from "lucide-react";
import { LogoIcon } from "@/components/logo-icon";

const features = [
  {
    title: "PDF Summary",
    description: "Ubah materi kuliah panjang menjadi rangkuman yang lebih singkat, jelas, dan mudah dipahami.",
    icon: FileText,
    color: "blue",
  },
  {
    title: "Flashcard Generator",
    description: "Buat kartu tanya-jawab otomatis untuk membantu mengingat konsep penting dari materi.",
    icon: Layers,
    color: "violet",
  },
  {
    title: "Quiz Practice",
    description: "Latihan soal pilihan ganda otomatis berdasarkan isi PDF yang kamu upload.",
    icon: ClipboardList,
    color: "emerald",
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
    title: "Smart Learning",
    description: "Rangkuman, flashcard, dan quiz dibuat secara otomatis",
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

const colorClasses = {
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
    gradient: "from-blue-500 to-cyan-500",
  },
  violet: {
    bg: "bg-violet-100 dark:bg-violet-900/30",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-200 dark:border-violet-800",
    gradient: "from-violet-500 to-purple-500",
  },
  emerald: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
    gradient: "from-emerald-500 to-teal-500",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <LogoIcon className="h-9 w-9" />
            <span className="text-lg font-bold text-foreground">SINAUWU</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="/login">Masuk</a>
            </Button>
            <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
              <a href="/register">Daftar</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-violet-200/30 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-1.5 text-violet-500" />
              Learning Assistant for Students
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Belajar Lebih{" "}
              <span className="text-gradient-hero">Pintar</span>
              <br className="hidden sm:block" /> dengan AI
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Upload PDF materi kuliahmu, lalu ubah menjadi rangkuman, flashcard,
              dan kuis latihan dengan bantuan AI.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" asChild className="w-full sm:w-auto h-11 px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                <a href="/register">
                  Mulai Sekarang
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto h-11 px-8">
                <a href="#features">
                  <Play className="w-4 h-4 mr-2" />
                  Lihat Fitur
                </a>
              </Button>
            </div>
          </div>

          {/* Preview Card */}
          <div className="mt-16 sm:mt-20 flex justify-center hidden sm:flex">
            <div className="relative w-full max-w-2xl">
              <div className="rounded-2xl border bg-card shadow-2xl shadow-black/5 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="grid grid-cols-3 gap-4 p-6">
                  <div className="space-y-2 rounded-xl bg-muted/60 p-4">
                    <div className="h-4 w-16 rounded bg-muted" />
                    <div className="h-8 w-12 rounded-lg bg-violet-500/20" />
                    <div className="h-3 w-20 rounded bg-muted" />
                  </div>
                  <div className="space-y-2 rounded-xl bg-muted/60 p-4">
                    <div className="h-4 w-16 rounded bg-muted" />
                    <div className="h-8 w-12 rounded-lg bg-emerald-500/20" />
                    <div className="h-3 w-14 rounded bg-muted" />
                  </div>
                  <div className="space-y-2 rounded-xl bg-muted/60 p-4">
                    <div className="h-4 w-16 rounded bg-muted" />
                    <div className="h-8 w-12 rounded-lg bg-blue-500/20" />
                    <div className="h-3 w-12 rounded bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              Fitur Unggulan
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Semua yang Kamu Butuhkan
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              SINAUWU menyediakan berbagai tools AI untuk membantumu memahami materi lebih cepat.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              const colors = colorClasses[feature.color as keyof typeof colorClasses];
              return (
                <Card
                  key={feature.title}
                  className="group hover-lift border bg-card"
                >
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-xl ${colors.bg} mb-4`}>
                      <Icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <Badge variant="outline" className="mb-4 px-4 py-1.5">
                Kenapa SINAUWU?
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Dirancang untuk <span className="text-gradient-hero">Pelajar</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Dengan SINAUWU, kamu bisa belajar lebih efisien tanpa harus menghabiskan waktu membaca materi yang panjang.
              </p>

              <div className="mt-8 space-y-4">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={benefit.title}
                      className="flex items-start gap-4 p-4 rounded-xl bg-card border hover-lift"
                    >
                      <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "3", label: "Tools AI", color: "violet" },
                { value: "PDF", label: "Materi", color: "blue" },
                { value: "100%", label: "Gratis", color: "emerald" },
                { value: "24/7", label: "Akses", color: "amber" },
              ].map((stat) => {
                const colors = colorClasses[stat.color as keyof typeof colorClasses] || colorClasses.violet;
                return (
                  <Card key={stat.label} className="group hover-lift border bg-card">
                    <CardContent className="p-6 text-center">
                      <p className={`text-3xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white">
            <CardContent className="p-10 sm:p-14 text-center">
              <div className="inline-flex p-4 rounded-2xl bg-white/10 mb-6">
                <LogoIcon className="w-12 h-12" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Siap Memulai Perjalanan Belajarmu?
              </h2>
              <p className="mt-4 text-white/80 max-w-md mx-auto">
                Upload PDF pertamamu dan rasakan kemudahan belajar dengan bantuan AI.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 h-12 px-8 bg-white text-violet-700 hover:bg-white/90 font-semibold shadow-xl"
              >
                <a href="/register">
                  Daftar Sekarang
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <LogoIcon className="w-7 h-7" />
              <span className="font-semibold">SINAUWU</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built for Students
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

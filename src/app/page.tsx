"use client";

import { useEffect, useRef } from "react";
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
  ChevronDown,
  Play,
} from "lucide-react";
import { LogoIcon } from "@/components/logo-icon";

const features = [
  {
    title: "PDF Summary",
    description: "Ubah materi kuliah panjang menjadi rangkuman yang lebih singkat, jelas, dan mudah dipahami.",
    icon: FileText,
    color: "from-blue-500 to-cyan-400",
    bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    title: "Flashcard Generator",
    description: "Buat kartu tanya-jawab otomatis untuk membantu mengingat konsep penting dari materi.",
    icon: Layers,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-gradient-to-br from-violet-500 to-purple-500",
  },
  {
    title: "Quiz Practice",
    description: "Latihan soal pilihan ganda otomatis berdasarkan isi PDF yang kamu upload.",
    icon: ClipboardList,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-gradient-to-br from-emerald-500 to-teal-500",
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
    description: "Rangkuman, flashcard, dan quiz dibuat secara otomatis untuk kemudahanmu",
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const particleCount = 50;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.hue = 260 + Math.random() * 60;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
        ctx.fill();
      }
    }

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 backdrop-blur-2xl bg-background/70 border-b border-border/20">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-violet-500/30 rounded-xl blur-lg group-hover:bg-violet-500/50 transition-all duration-300" />
              <LogoIcon className="relative" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              SINAUWU
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-sm font-medium hover:bg-violet-100 dark:hover:bg-violet-900/30">
              <a href="/login">Masuk</a>
            </Button>
            <Button asChild size="sm" className="text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300">
              <a href="/register">Daftar</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 z-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-purple-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-6 sm:mb-8 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-500/30 rounded-full blur-md animate-pulse" />
                <Badge variant="secondary" className="relative px-4 py-1.5 text-sm font-medium bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 border border-violet-200/50 dark:border-violet-700/50">
                  <Sparkles className="mr-1.5 h-4 w-4 text-violet-600 dark:text-violet-400" />
                  Learning Assistant for Students
                </Badge>
              </div>
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight animate-fade-in stagger-1">
              Belajar Lebih{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  Pintar
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent blur-xl opacity-50">
                  Pintar
                </span>
              </span>{" "}
              dengan AI
            </h1>

            <p className="mx-auto mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl leading-7 sm:leading-8 text-muted-foreground px-4 animate-fade-in stagger-2">
              Upload PDF materi kuliahmu, lalu ubah menjadi rangkuman, flashcard,
              dan kuis latihan dengan bantuan AI. Belajar lebih efisien kapan saja.
            </p>

            {/* Buttons - Side by Side */}
            <div className="mt-8 sm:mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in stagger-3">
              <Button asChild size="lg" className="h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-medium bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105 group">
                <a href="/register">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>

              <Button asChild size="lg" variant="outline" className="h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-medium border-2 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-300 hover:scale-105 glass-card">
                <a href="#features">
                  <Play className="mr-2 h-4 w-4" />
                  Lihat Fitur
                </a>
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-12 sm:mt-16 animate-bounce">
              <a href="#features" className="inline-flex flex-col items-center gap-1 text-muted-foreground hover:text-violet-600 transition-colors">
                <span className="text-xs font-medium">Scroll</span>
                <ChevronDown className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Floating UI Preview */}
          <div className="mt-16 sm:mt-20 hidden lg:flex justify-center perspective">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
              <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl shadow-violet-500/10 preserve-3d rotate-y-3 hover:rotate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-400 animate-pulse" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
                  <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
                <div className="grid grid-cols-3 gap-4 p-6">
                  <div className="space-y-2 rounded-xl bg-muted/50 p-4 hover:bg-muted/70 transition-colors">
                    <div className="h-4 w-20 rounded bg-muted animate-pulse" />
                    <div className="h-8 w-12 rounded bg-violet-500/30" />
                    <div className="h-3 w-28 rounded bg-muted animate-pulse" />
                  </div>
                  <div className="space-y-2 rounded-xl bg-muted/50 p-4 hover:bg-muted/70 transition-colors">
                    <div className="h-4 w-20 rounded bg-muted animate-pulse" />
                    <div className="h-8 w-12 rounded bg-emerald-500/30" />
                    <div className="h-3 w-24 rounded bg-muted animate-pulse" />
                  </div>
                  <div className="space-y-2 rounded-xl bg-muted/50 p-4 hover:bg-muted/70 transition-colors">
                    <div className="h-4 w-20 rounded bg-muted animate-pulse" />
                    <div className="h-8 w-12 rounded bg-blue-500/30" />
                    <div className="h-3 w-16 rounded bg-muted animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 sm:py-32 z-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 sm:mb-16 text-center">
            <Badge variant="outline" className="mb-4 sm:mb-6 text-xs sm:text-sm px-4 py-1.5 glass-card">
              Fitur Unggulan
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Semua yang Kamu Butuhkan untuk Belajar
            </h2>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base text-muted-foreground px-4">
              SINAUWU menyediakan berbagai tools AI untuk membantumu memahami materi lebih cepat dan efektif.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className={`group relative overflow-hidden border-border/50 glass-card hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500 hover:-translate-y-2 animate-fade-in stagger-${index + 1}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardHeader className="relative pb-2 px-5 sm:px-6">
                    <div className={`inline-flex w-fit rounded-2xl ${feature.bgColor} p-3 sm:p-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </CardHeader>

                  <CardContent className="relative px-5 sm:px-6 pb-5 sm:pb-6">
                    <CardTitle className="mb-2 text-lg sm:text-xl font-semibold">{feature.title}</CardTitle>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 sm:py-32 z-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div>
                <Badge variant="outline" className="mb-4 sm:mb-6 text-xs sm:text-sm px-4 py-1.5 glass-card">
                  Kenapa SINAUWU?
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  Dirancang untuk <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Pelajar</span>
                </h2>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Dengan SINAUWU, kamu bisa belajar lebih efisien tanpa harus menghabiskan waktu membaca materi yang panjang.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={benefit.title} className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl glass-card hover:bg-violet-50/50 dark:hover:bg-violet-900/20 transition-all duration-300 group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 group-hover:scale-110 transition-all duration-300">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg">{benefit.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button asChild size="lg" className="h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-medium bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-xl shadow-violet-500/30 transition-all duration-300 hover:scale-105 group">
                <a href="/register">
                  Coba Sekarang
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 order-1 lg:order-2">
              {[
                { value: "3", label: "Tools AI", gradient: "from-violet-500 to-purple-500" },
                { value: "PDF", label: "Materi", gradient: "from-blue-500 to-cyan-500" },
                { value: "100%", label: "Gratis", gradient: "from-emerald-500 to-teal-500" },
                { value: "24/7", label: "Akses", gradient: "from-amber-500 to-orange-500" },
              ].map((stat, index) => (
                <Card
                  key={stat.label}
                  className={`group relative overflow-hidden glass-card hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <CardContent className="relative p-5 sm:p-6 text-center">
                    <p className={`text-3xl sm:text-4xl font-bold bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-32 z-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-fuchsia-600/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Card className="relative overflow-hidden border-0 glass-card shadow-2xl shadow-violet-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

            <CardContent className="relative p-8 sm:p-12 md:p-16 text-center text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-xl mb-6 sm:mb-8 shadow-2xl animate-float">
                <LogoIcon className="h-10 w-10 sm:h-12 sm:w-12" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Siap Memulai Perjalanan Belajarmu?
              </h2>
              <p className="mx-auto mt-4 sm:mt-6 max-w-lg text-base sm:text-lg text-white/80">
                Upload PDF pertamamu dan rasakan kemudahan belajar dengan bantuan AI.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 sm:mt-10 h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg font-semibold bg-white text-violet-700 hover:bg-white/90 shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 group"
              >
                <a href="/register">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 sm:py-12 z-10 border-t border-border/20">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-500/20 rounded-lg blur-md group-hover:bg-violet-500/40 transition-all duration-300" />
                <LogoIcon className="relative" />
              </div>
              <span className="font-bold text-base sm:text-lg bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                SINAUWU
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Built for Students • 2024
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

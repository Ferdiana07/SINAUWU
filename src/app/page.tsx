"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogoIcon } from "@/components/logo-icon";
import { ArrowRight, FileText, Layers, ClipboardList, Sparkles, Clock, Shield, Zap, Brain, BookOpen, Target, ChevronDown } from "lucide-react";

const features = [
  {
    title: "Rangkum Instan",
    description: "Dari 50 halaman jadi 1 halaman. Paham inti tanpa capek.",
    icon: FileText,
    color: "indigo",
    accent: "bg-indigo-500"
  },
  {
    title: "Flashcard Otomatis",
    description: "Kartu belajar, ingat selamanya. Langsung jadi.",
    icon: Layers,
    color: "coral",
    accent: "bg-orange-500"
  },
  {
    title: "Quiz Latihan",
    description: "Uji pahammu dengan soal yang AI bikin dari PDF mu.",
    icon: ClipboardList,
    color: "teal",
    accent: "bg-teal-500"
  },
];

const stats = [
  { value: "< 30 detik", label: "Hemat waktu", icon: Zap },
  { value: "100%", label: "Gratis & Privasi", icon: Shield },
  { value: "3 in 1", label: "Rangkum + Flash + Quiz", icon: Brain },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* ===== DECORATIVE BLOBS ===== */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Blob 1 - Top Left */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-200/40 dark:bg-indigo-900/20 animate-blob" />
        {/* Blob 2 - Top Right */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-orange-200/30 dark:bg-orange-900/20 animate-blob" style={{ animationDelay: "2s" }} />
        {/* Blob 3 - Bottom */}
        <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] bg-teal-200/30 dark:bg-teal-900/20 animate-blob" style={{ animationDelay: "4s" }} />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      </div>

      {/* ===== NAVIGATION ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <LogoIcon className="h-10 w-10" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight">SINAUWU</span>
              <span className="hidden sm:block text-[10px] text-muted-foreground -mt-1">Belajar tanpa batas</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
              <a href="/login">Masuk</a>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg" asChild>
              <a href="/register">
                Daftar Gratis
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              {/* Badge */}

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
                <span className="text-gradient-hero">PDF</span>
                <br />
                <span className="text-foreground">Jadi Pintar</span>
                <br />
                <span className="text-muted-foreground/60">dalam Sekejap</span>
              </h1>

              {/* Subheadline */}
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Upload PDF materimu, dapat <span className="text-primary font-semibold">rangkuman</span>,
                <span className="text-orange-500 font-semibold"> flashcard</span>, dan
                <span className="text-teal-500 font-semibold"> kuis</span> — semua dalam 30 detik.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 text-lg font-bold" asChild>
                  <a href="/register">
                    Mulai Gratis Sekarang
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base font-medium border-2" asChild>
                  <a href="#features">
                    Lihat Demo
                    <ChevronDown className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>

              {/* Mini stats */}
              <div className="mt-10 flex flex-wrap gap-6">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right - Abstract Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square">
                {/* Main Card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-80 bg-card rounded-3xl shadow-2xl shadow-black/10 border border-border/50 animate-float-double overflow-hidden">
                  {/* Fake PDF Preview */}
                  <div className="h-10 bg-muted border-b flex items-center gap-2 px-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-2 text-xs text-muted-foreground">materi-kalkulus.pdf</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="h-2 w-full rounded bg-muted" />
                    <div className="h-2 w-5/6 rounded bg-muted" />
                    <div className="h-2 w-4/5 rounded bg-muted" />
                    <div className="h-6 w-24 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 mt-4" />
                    <div className="h-2 w-full rounded bg-muted" />
                    <div className="h-2 w-3/4 rounded bg-muted" />
                  </div>
                  {/* Processing indicator */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-indigo-500 to-orange-500 rounded-full animate-pulse" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">Generating...</p>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-10 right-10 w-24 h-28 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl shadow-lg shadow-orange-500/30 animate-float flex items-center justify-center">
                  <Layers className="w-10 h-10 text-white" />
                </div>

                <div className="absolute bottom-16 left-4 w-20 h-24 bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl shadow-lg shadow-teal-500/30 animate-float-reverse flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>

                <div className="absolute top-24 left-8 w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-full shadow-lg shadow-indigo-500/30 animate-float" style={{ animationDelay: "1s" }}>
                  <FileText className="w-7 h-7 text-white m-auto" />
                </div>

                {/* Decorative circles */}
                <div className="absolute -bottom-8 right-12 w-12 h-12 border-4 border-dashed border-orange-300 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
                <div className="absolute top-1/2 -right-8 w-6 h-6 bg-teal-400/50 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="py-20 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium mb-4 border-2">
              <span className="text-orange-500 mr-2">✦</span>
              Fitur Utama
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Satu Upload,
              <br />
              <span className="text-gradient-hero">Tiga Hasil</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Cukup upload PDF sekali, dapat semua tools belajar yang kamu butuhkan.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative bg-card rounded-3xl p-8 border border-border/50 shadow-lift hover-lift overflow-hidden"
                >
                  {/* Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${feature.accent}`} />

                  {/* Number Badge */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                    0{index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl ${feature.accent}/10 mb-6`}>
                    <Icon className={`w-8 h-8 ${feature.accent.replace('bg-', 'text-')}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Effect */}
                  <div className={`absolute -bottom-20 -right-20 w-40 h-40 ${feature.accent} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 sm:py-32 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-30" />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium mb-4 border-2">
              <span className="text-teal-500 mr-2">→</span>
              Cara Kerja
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Simpler dari yang kamu
              <br />
              <span className="text-gradient-primary">kira</span>
            </h2>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Upload PDF",
                description: "Drag & drop atau pilih file PDF dari perangkatmu. Semua format didukung.",
                icon: BookOpen,
                color: "indigo"
              },
              {
                step: "02",
                title: "AI Memproses",
                description: "Dalam hitungan detik, AI menganalisis dan membuat rangkuman, flashcard, dan kuis.",
                icon: Brain,
                color: "coral"
              },
              {
                step: "03",
                title: "Belajar & Latihan",
                description: "Gunakan hasil untuk belajar lebih efisien. Cek pemahamanmu dengan quiz.",
                icon: Target,
                color: "teal"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              const colorMap = {
                indigo: { bg: "bg-indigo-500", text: "text-indigo-500", hover: "hover:bg-indigo-500/10" },
                coral: { bg: "bg-orange-500", text: "text-orange-500", hover: "hover:bg-orange-500/10" },
                teal: { bg: "bg-teal-500", text: "text-teal-500", hover: "hover:bg-teal-500/10" }
              };
              const colors = colorMap[item.color as keyof typeof colorMap];

              return (
                <div key={item.step} className="relative">
                  {/* Connector Line (except last) */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent -translate-x-1/2" />
                  )}

                  <div className="text-center">
                    {/* Icon Circle */}
                    <div className={`inline-flex p-5 rounded-full ${colors.bg}/10 mb-6 border-2 ${colors.bg}/20 ${colors.hover} transition-colors cursor-pointer`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>

                    {/* Step Number */}
                    <div className={`text-6xl font-black ${colors.text} opacity-10 -mt-8 mb-2`}>
                      {item.step}
                    </div>

                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== VALUE PROPS ===== */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Visual */}
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {/* Card 1 */}
                <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-lift">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Hemat Waktu</h4>
                  <p className="text-sm text-muted-foreground">Tidak perlu baca 100 halaman untuk paham 1 topik</p>
                </div>

                {/* Card 2 */}
                <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-lift mt-8">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-indigo-500" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Privasi Aman</h4>
                  <p className="text-sm text-muted-foreground">Dokumenmu hanya untukmu, tidak pernah dibagikan</p>
                </div>

                {/* Card 3 */}
                <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-lift -mt-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-teal-500" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Cepat & Instan</h4>
                  <p className="text-sm text-muted-foreground">Hasil langsung bisa digunakan dalam hitungan detik</p>
                </div>

                {/* Card 4 */}
                <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-lift mt-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-violet-500" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Gratis Selamanya</h4>
                  <p className="text-sm text-muted-foreground">Tidak ada biaya tersembunyi, mulai dari nol</p>
                </div>
              </div>
            </div>

            {/* Right - Text */}
            <div className="order-1 lg:order-2">
              <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium mb-4 border-2">
                <span className="text-indigo-500 mr-2">★</span>
                Kenapa SINAUWU?
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Dirancang untuk
                <br />
                <span className="text-gradient-hero">mahasiswa</span> Indonesia
              </h2>

              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Kita tahu betapa sibuknya hidup mahasiswa. Tuntutan akademik yang tinggi,
                materi yang banyak, dan waktu yang sedikit.
              </p>

              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                SINAUWU dibuat untuk jadi <span className="font-semibold text-foreground">teman belajar</span>
                yang selalu siap bantu — kapan saja, di mana saja.
              </p>

              <div className="mt-8">
                <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 shadow-lg" asChild>
                  <a href="/register">
                    Coba Sekarang, Gratis!
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-orange-500" />

        <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-float" />
          <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white/10 rounded-full animate-float-reverse" />
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/50 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />

          <div className="inline-flex p-4 rounded-full bg-white/10 mb-8">
            <LogoIcon className="w-16 h-16" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Siap transformasi
            <br />
            cara belajarmu?
          </h2>

          <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto">
            Mulai dari sekarang. Gratis. Tanpa kartu kredit.
            PDF pertamamu menunggu.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-10 bg-white text-indigo-600 hover:bg-white/90 shadow-xl text-lg font-bold" asChild>
              <a href="/register">
                Daftar Sekarang
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-white border-white/30 bg-white/10 hover:bg-white/20 text-lg font-medium" asChild>
              <a href="/login">
                Sudah punya akun?
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t py-12 bg-card">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <LogoIcon className="w-8 h-8" />
              <div>
                <span className="font-bold text-lg">SINAUWU</span>
                <p className="text-xs text-muted-foreground">Belajar tanpa batas</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Privasi Aman
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                Cepat & Instan
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Powered by AI
              </span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            Built with ❤️ for Indonesian students
          </div>
        </div>
      </footer>
    </main>
  );
}

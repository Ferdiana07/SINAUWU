"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Layers,
  ClipboardList,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Check,
} from "lucide-react";
import { LogoIcon } from "@/components/logo-icon";

const features = [
  {
    title: "Rangkuman Instan",
    description: "AI mengubah PDF panjang jadi rangkuman poin-poin kunci dalam hitungan detik.",
    icon: FileText,
  },
  {
    title: "Flashcard Otomatis",
    description: "Kartu tanya-jawab interaktif untuk bantu kamu mengingat konsep penting.",
    icon: Layers,
  },
  {
    title: "Quiz Latihan",
    description: "Soal pilihan ganda untuk menguji pemahamanmu terhadap materi.",
    icon: ClipboardList,
  },
];

const benefits = [
  "Tidak perlu baca 100 halaman untuk paham 1 topik",
  "Flashcard & quiz generated dalam hitungan detik",
  "Dokumenmu aman, hanya bisa kamu akses",
  "Gratis untuk selamanya",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <LogoIcon className="h-9 w-9" />
            <span className="text-lg font-bold tracking-tight">SINAUWU</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <a href="/login">Masuk</a>
            </Button>
            <Button size="sm" asChild className="bg-teal-600 hover:bg-teal-700 text-white">
              <a href="/register">Daftar</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-40 translate-y-1/2" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left - Hero Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-medium">
                <Zap className="w-4 h-4" />
                Powered by Gemini AI
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Belajar lebih{" "}
                <span className="relative">
                  <span className="relative z-10 text-teal-600">cerdas</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-amber-300/50 -z-0" />
                </span>
                <br />
                bukan lebih keras
              </h1>

              <p className="text-lg text-stone-600 max-w-lg leading-relaxed">
                Upload PDF materi kuliahmu. Dalam hitungan detik, AI membuat rangkuman, flashcard, dan quiz otomatis. Siap belajar lebih efisien hari ini.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild className="h-12 px-8 bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-lg shadow-teal-600/25">
                  <a href="/register">
                    Mulai Gratis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-12 px-8 font-medium border-2 border-stone-300 hover:border-stone-400">
                  <a href="#features">
                    Lihat Fitur
                  </a>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-2 border-white" />
                  ))}
                </div>
                <p className="text-sm text-stone-600">
                  <span className="font-semibold text-stone-900">1,000+</span> mahasiswa sudah bergabung
                </p>
              </div>
            </div>

            {/* Right - Preview Card */}
            <div className="relative">
              <div className="relative rounded-2xl bg-white shadow-2xl shadow-stone-200/50 border border-stone-200 overflow-hidden">
                {/* Browser header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-stone-100 border-b border-stone-200">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-stone-500">sinauwu.app</span>
                </div>

                {/* Preview content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Pengantar Ekonomi Makro.pdf</p>
                      <p className="text-xs text-stone-500">Uploaded 2 jam lalu</p>
                    </div>
                  </div>

                  <div className="h-px bg-stone-100" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-stone-600">Rangkuman</span>
                      <span className="flex items-center gap-1 text-teal-600 font-medium">
                        <Check className="w-4 h-4" /> Selesai
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-stone-600">Flashcard</span>
                      <span className="flex items-center gap-1 text-teal-600 font-medium">
                        <Check className="w-4 h-4" /> 25 kartu
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-stone-600">Quiz</span>
                      <span className="flex items-center gap-1 text-amber-600 font-medium">
                        <Clock className="w-4 h-4" /> Dalam proses
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 p-3 rounded-xl bg-white shadow-lg border border-stone-100 animate-bounce-slow">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-teal-600" />
                  <span className="font-medium text-stone-700">100% Private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-28 bg-white border-y border-stone-200">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Semua dalam satu platform
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto">
              Cukup upload PDF, biarkan AI yang kerja kerasnya. Kamu fokus belajar.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="group border-stone-200 hover:border-teal-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:bg-teal-100 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left - Benefits */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Kenapa pakai SINAUWU?
                </h2>
                <p className="text-stone-600 text-lg">
                  Dibuat khusus untuk mahasiswa Indonesia yang ingin belajar lebih efisien tanpa buang waktu.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-stone-200 hover:border-teal-200 hover:shadow-md transition-all">
                    <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <p className="text-stone-700">{benefit}</p>
                  </div>
                ))}
              </div>

              <Button asChild className="w-fit h-12 px-8 bg-teal-600 hover:bg-teal-700 text-white font-semibold">
                <a href="/register">
                  Coba Sekarang
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "3", label: "Tools AI", color: "teal" },
                { value: "PDF", label: "Format", color: "slate" },
                { value: "100%", label: "Gratis", color: "amber" },
                { value: "24/7", label: "Akses", color: "stone" },
              ].map((stat) => (
                <Card key={stat.label} className="border-stone-200 text-center p-6">
                  <p className={`text-4xl font-bold ${
                    stat.color === "teal" ? "text-teal-600" :
                    stat.color === "amber" ? "text-amber-500" :
                    "text-stone-900"
                  }`}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-stone-500 mt-1">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-stone-900 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Siap ubah cara belajarmu?
          </h2>
          <p className="text-stone-400 text-lg mb-8 max-w-lg mx-auto">
            Bergabung dengan ribuan mahasiswa yang sudah belajar lebih cerdas dengan SINAUWU.
          </p>
          <Button asChild size="lg" className="h-14 px-10 text-lg bg-white text-stone-900 hover:bg-stone-100 font-semibold shadow-2xl">
            <a href="/register">
              Daftar Gratis Sekarang
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-stone-950 text-stone-400">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <LogoIcon className="w-6 h-6" />
              <span className="font-semibold text-white">SINAUWU</span>
            </div>
            <p className="text-sm">
              © 2024 SINAUWU. Built for Indonesian Students.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

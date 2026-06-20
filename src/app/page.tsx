import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "PDF Summary",
    description:
      "Ubah materi kuliah panjang menjadi rangkuman yang lebih singkat, jelas, dan mudah dipahami.",
  },
  {
    title: "Flashcard Generator",
    description:
      "Buat kartu tanya-jawab otomatis untuk membantu mengingat konsep penting dari materi.",
  },
  {
    title: "Quiz Practice",
    description:
      "Latihan soal pilihan ganda otomatis berdasarkan isi PDF yang kamu upload.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <Badge variant="outline" className="mb-6">
          AI Learning Assistant for Students
        </Badge>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          SINAUWU
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Upload PDF materi kuliahmu, lalu ubah menjadi rangkuman, flashcard,
          dan kuis latihan dengan bantuan AI.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <a href="/dashboard">Mulai Belajar</a>
          </Button>

          <Button asChild size="lg" variant="outline">
            <a href="#features">Lihat Fitur</a>
          </Button>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
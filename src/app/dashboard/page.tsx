import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    title: "Total Dokumen",
    value: "0",
    description: "PDF materi yang sudah kamu upload.",
  },
  {
    title: "Flashcard",
    value: "0",
    description: "Kartu belajar yang sudah dibuat.",
  },
  {
    title: "Quiz",
    value: "0",
    description: "Latihan soal yang tersedia.",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-center">
          <div>
            <Badge variant="outline">Dashboard</Badge>
            <h1 className="mt-4 text-3xl font-bold">Dashboard SINAUWU</h1>
            <p className="mt-2 text-muted-foreground">
              Kelola materi kuliah, rangkuman, flashcard, dan quiz kamu di sini.
            </p>
          </div>

          <Button>Upload PDF</Button>
        </div>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {stats.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{item.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Belum ada dokumen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Fitur upload PDF akan kita buat di langkah berikutnya. Nantinya
                dokumen yang kamu upload akan muncul di bagian ini.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
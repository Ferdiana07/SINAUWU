import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DocumentPage({ params }: PageProps) {
  const { id } = await params;

  const document = await prisma.document.findUnique({
    where: { id },
    include: { summary: true },
  });

  if (!document) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_45%)] p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <Button variant="ghost" asChild className="-ml-2 mb-3">
            <Link href={`/dashboard/documents/${document.id}`}>← Kembali</Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{document.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Ringkasan materi yang telah dibuat untuk dokumen ini.</p>
        </div>

        {!document.summary ? (
          <Card className="border-dashed shadow-sm">
            <CardContent className="p-8 text-center">
              <p className="text-lg font-medium">Summary belum dibuat</p>
              <p className="mt-2 text-sm text-muted-foreground">Buat rangkuman dari dokumen ini untuk memulai belajar dengan lebih cepat.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Ringkasan Singkat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-slate-700">{document.summary.shortSummary}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Penjelasan Lengkap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-slate-700">{document.summary.detailedSummary || "Tidak ada penjelasan lengkap yang tersedia."}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Point Penting</CardTitle>
              </CardHeader>
              <CardContent>
                {document.summary.keyPoints ? (
                  <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                    {JSON.stringify(document.summary.keyPoints, null, 2)}
                  </pre>
                ) : (
                  <p className="text-sm text-muted-foreground">Tidak ada point penting yang tersedia.</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
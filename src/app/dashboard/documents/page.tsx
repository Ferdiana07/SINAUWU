import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DeleteDocumentButton from "@/components/delete-document-button";

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({
    include: {
      summary: true,
      flashcards: true,
      quizzes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Button variant="ghost" asChild className="-ml-2 mb-3">
              <Link href="/dashboard">Kembali ke Dashboard</Link>
            </Button>
            <p className="text-sm font-medium text-slate-500">Dokumen</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Kelola Semua Materi</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Buka rangkuman, flashcard, dan quiz dari setiap dokumen dengan satu klik.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/upload">Upload Dokumen Baru</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {documents.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-slate-50 p-8 text-center">
            <p className="font-medium">Belum ada dokumen</p>
            <p className="mt-1 text-sm text-muted-foreground">Upload file PDF terlebih dahulu untuk mulai mengelola materi.</p>
          </div>
        ) : (
          documents.map((doc) => (
            <div key={doc.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold">{doc.title}</h2>
                    <Badge variant="secondary">{doc.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{doc.fileName}</p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1">Summary: {doc.summary ? "Siap" : "Belum"}</span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1">Flashcard: {doc.flashcards.length}</span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1">Quiz: {doc.quizzes.length}</span>
                  </div>
                </div>

              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild variant="outline">
                  <Link href={`/dashboard/documents/${doc.id}`}>
                    Detail Dokumen
                  </Link>
                </Button>

                <DeleteDocumentButton documentId={doc.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

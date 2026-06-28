"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TopHeader } from "@/components/top-header";
import DeleteDocumentButton from "@/components/delete-document-button";
import {
  DocumentFilters,
  useFilteredDocuments,
  DocumentCard,
} from "@/components/document-filters";
import {
  FileText,
  Upload,
  CheckCircle2,
  Layers,
  ClipboardList,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  fileName: string;
  status: string;
  createdAt: Date;
  summary: { id: string } | null;
  flashcards: { id: string }[];
  quizzes: { id: string }[];
}

interface DocumentsClientProps {
  initialDocuments: Document[];
}

export function DocumentsClient({ initialDocuments }: DocumentsClientProps) {
  const [filters, setFilters] = useState({
    search: "",
    status: "all" as "all" | "UPLOADED" | "PROCESSED",
    hasSummary: null as boolean | null,
    hasFlashcards: null as boolean | null,
    hasQuiz: null as boolean | null,
  });

  const filteredDocuments = useFilteredDocuments(initialDocuments, filters);

  return (
    <div className="space-y-6">
      <TopHeader
        title="Dokumen"
        description="Kelola semua materi PDF yang sudah kamu upload"
        actions={
          <Button asChild>
            <Link href="/dashboard/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Baru
            </Link>
          </Button>
        }
      />

      {/* Filters */}
      <DocumentFilters onFilterChange={setFilters} />

      {/* Results Count */}
      {filters.search && (
        <p className="text-sm text-muted-foreground">
          Ditemukan {filteredDocuments.length} dari {initialDocuments.length} dokumen
        </p>
      )}

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10">
              <FileText className="h-10 w-10 text-blue-600" />
            </div>
            {initialDocuments.length === 0 ? (
              <>
                <h3 className="text-xl font-semibold">Belum ada dokumen</h3>
                <p className="mt-2 max-w-sm text-center text-muted-foreground">
                  Upload file PDF pertama untuk memulai membuat rangkuman, flashcard, dan quiz dengan bantuan AI.
                </p>
                <Button asChild className="mt-6">
                  <Link href="/dashboard/upload">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Upload PDF Pertamamu
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold">Tidak ada hasil</h3>
                <p className="mt-2 max-w-sm text-center text-muted-foreground">
                  Coba ubah kata kunci pencarian atau filter yang digunakan.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="group overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
            >
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  {/* Left - Document Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                          {doc.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">{doc.fileName}</p>
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={doc.status === "PROCESSED" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}
                      >
                        {doc.status === "PROCESSED" ? (
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                        ) : null}
                        {doc.status}
                      </Badge>

                      <Badge variant="outline" className={doc.summary ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400" : ""}>
                        <CheckCircle2 className={`mr-1 h-3 w-3 ${doc.summary ? "text-emerald-500" : "text-muted-foreground/50"}`} />
                        Summary
                      </Badge>

                      <Badge variant="outline" className="gap-1">
                        <Layers className="h-3 w-3" />
                        {doc.flashcards.length} Flashcard
                      </Badge>

                      <Badge variant="outline" className="gap-1">
                        <ClipboardList className="h-3 w-3" />
                        {doc.quizzes.length} Quiz
                      </Badge>
                    </div>
                  </div>

                  {/* Right - Actions */}
                  <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                    <Button asChild variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Link href={`/dashboard/documents/${doc.id}`}>
                        Detail
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteDocumentButton documentId={doc.id} />
                  </div>
                </div>

                {/* Quick Access Links */}
                <div className="mt-4 flex flex-wrap gap-2 border-t border-border/50 pt-4">
                  <Button variant="ghost" size="sm" asChild className="text-xs">
                    <Link href={`/dashboard/documents/${doc.id}/summary`}>
                      <FileText className="mr-1.5 h-3.5 w-3.5" />
                      Rangkuman
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="text-xs">
                    <Link href={`/dashboard/documents/${doc.id}/flashcards`}>
                      <Layers className="mr-1.5 h-3.5 w-3.5" />
                      Flashcard
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="text-xs">
                    <Link href={`/dashboard/documents/${doc.id}/quiz`}>
                      <ClipboardList className="mr-1.5 h-3.5 w-3.5" />
                      Quiz
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
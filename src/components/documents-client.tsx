"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { TopHeader } from "@/components/top-header";
import DeleteDocumentButton from "@/components/delete-document-button";
import {
  FileText,
  Upload,
  Sparkles,
  Search,
  X,
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  fileName: string;
  createdAt: Date;
}

export function DocumentsClient({ initialDocuments }: { initialDocuments: Document[] }) {
  const [search, setSearch] = useState("");

  const filteredDocuments = initialDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase()) ||
    doc.fileName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <TopHeader
        title="Dokumen"
        actions={
          <Link
            href="/dashboard/upload"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Upload Baru</span>
            <span className="sm:hidden">Upload</span>
          </Link>
        }
      />

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari dokumen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results Count */}
      {search && (
        <p className="text-sm text-muted-foreground">
          Ditemukan {filteredDocuments.length} dari {initialDocuments.length} dokumen
        </p>
      )}

      {/* Documents List */}
      {filteredDocuments.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10 sm:py-16">
            <div className="mb-4 sm:mb-6 flex h-16 sm:h-20 w-16 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10">
              <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
            </div>
            {initialDocuments.length === 0 ? (
              <>
                <h3 className="text-lg sm:text-xl font-semibold">Belum ada dokumen</h3>
                <p className="mt-2 max-w-sm text-center text-muted-foreground text-sm px-4">
                  Upload file PDF pertama untuk memulai membuat rangkuman dengan bantuan AI.
                </p>
                <Link
                  href="/dashboard/upload"
                  className="mt-4 sm:mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  <Sparkles className="h-4 w-4" />
                  Upload PDF Pertamamu
                </Link>
              </>
            ) : (
              <>
                <h3 className="text-lg sm:text-xl font-semibold">Tidak ada hasil</h3>
                <p className="mt-2 text-muted-foreground text-sm">Coba ubah kata kunci pencarian.</p>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {filteredDocuments.map((doc) => (
            <Card
              key={doc.id}
              className="border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
            >
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4">
                {/* Document Icon */}
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>

                {/* Document Info */}
                <div className="flex-1 min-w-0 w-full sm:w-auto">
                  <h2 className="truncate text-sm font-medium">{doc.title}</h2>
                  <p className="truncate text-xs text-muted-foreground">{doc.fileName}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Link
                    href={`/dashboard/documents/${doc.id}`}
                    className="rounded-lg border border-border bg-background px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Detail
                  </Link>
                  <DeleteDocumentButton documentId={doc.id} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
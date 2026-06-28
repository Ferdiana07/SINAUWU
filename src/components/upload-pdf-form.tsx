"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/toast";
import { Upload, FileText, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function UploadPdfForm() {
  const router = useRouter();
  const { addToast } = useToast();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setError(null);
      // Auto-fill title from filename if empty
      if (!title) {
        const fileName = droppedFile.name.replace(".pdf", "").replace(/_/g, " ").replace(/-/g, " ");
        setTitle(fileName);
      }
    } else {
      setError("Hanya file PDF yang didukung");
    }
  }, [title]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError(null);
        // Auto-fill title from filename if empty
        if (!title) {
          const fileName = selectedFile.name.replace(".pdf", "").replace(/_/g, " ").replace(/-/g, " ");
          setTitle(fileName);
        }
      } else {
        setError("Hanya file PDF yang didukung");
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!file) {
      setError("Pilih file PDF terlebih dahulu.");
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("File terlalu besar. Maksimal 5 MB.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title || file.name.replace(".pdf", ""));
    formData.append("file", file);

    setIsUploading(true);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Upload gagal.");
        addToast({
          type: "error",
          title: "Upload Gagal",
          description: result.message || "Terjadi kesalahan saat mengupload file.",
        });
        return;
      }

      addToast({
        type: "success",
        title: "Upload Berhasil!",
        description: "Dokumenmu sedang diproses. Akan diarahkan ke dashboard...",
      });

      // Small delay then redirect
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1500);
    } catch {
      setError("Terjadi kesalahan saat upload.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Input */}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Judul Materi
        </label>
        <input
          id="title"
          type="text"
          placeholder="Contoh: Manajemen Risiko Keamanan Informasi"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
        />
        <p className="text-xs text-muted-foreground">
          Kalau dikosongkan, judul akan diambil dari nama file.
        </p>
      </div>

      {/* File Drop Zone */}
      <div className="space-y-2">
        <label className="text-sm font-medium">File PDF</label>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer",
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
              : file
              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
              : "border-border hover:border-muted-foreground/50 hover:bg-muted/50",
            isUploading && "pointer-events-none opacity-50"
          )}
        >
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileChange}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />

          {file ? (
            <div className="flex items-center justify-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="font-medium text-emerald-700 dark:text-emerald-400">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  removeFile();
                }}
                className="ml-4 rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Drag & drop file PDF di sini
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  atau klik untuk memilih file
                </p>
              </div>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Format PDF, maksimal 5 MB.
        </p>
      </div>

      {/* Messages */}
      {error && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isUploading || !file}
        className="w-full h-12 text-base"
      >
        {isUploading ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Mengupload...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload PDF
          </>
        )}
      </Button>
    </form>
  );
}
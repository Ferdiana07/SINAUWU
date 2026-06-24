"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function UploadPdfForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");

    if (!file) {
      setMessage("Pilih file PDF terlebih dahulu.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    setIsUploading(true);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Upload gagal.");
        return;
      }

      setMessage("PDF berhasil diupload.");
      router.push("/dashboard");
      router.refresh();
    } catch {
      setMessage("Terjadi kesalahan saat upload.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="text-xs text-muted-foreground">
          Kalau dikosongkan, judul akan diambil dari nama file.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="file" className="text-sm font-medium">
          File PDF
        </label>
        <input
          id="file"
          type="file"
          accept="application/pdf,.pdf"
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
          }}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Format PDF, maksimal 5 MB.
        </p>
      </div>

      {message && (
        <p className="rounded-md border px-3 py-2 text-sm text-muted-foreground">
          {message}
        </p>
      )}

      <Button type="submit" disabled={isUploading}>
        {isUploading ? "Mengupload..." : "Upload PDF"}
      </Button>
    </form>
  );
}
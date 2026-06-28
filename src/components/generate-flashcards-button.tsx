"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast";
import { Layers, Loader2, RotateCcw } from "lucide-react";

export default function GenerateFlashcardsButton() {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    const pathParts = window.location.pathname.split("/");
    const docId = pathParts[3];

    if (!docId) {
      addToast({
        type: "error",
        title: "Error",
        description: "Document ID tidak ditemukan",
      });
      return;
    }

    try {
      setLoading(true);

      addToast({
        type: "info",
        title: "Generating Flashcards",
        description: "AI sedang membuat flashcard untukmu...",
      });

      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId: docId,
        }),
      });

      const data = await response.json();

      if (!data.success && data.error) {
        throw new Error(data.error);
      }

      addToast({
        type: "success",
        title: "Flashcards Berhasil Dibuat!",
        description: `${data.count || 0} flashcard sudah siap untuk dipelajari.`,
      });

      router.refresh();
    } catch (error) {
      console.error(error);
      addToast({
        type: "error",
        title: "Gagal Membuat Flashcards",
        description: error instanceof Error ? error.message : "Terjadi kesalahan yang tidak diketahui.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Layers className="h-4 w-4" />
          Generate Flashcards
        </>
      )}
    </button>
  );
}

// Regenerate Flashcards Button
export function RegenerateFlashcardsButton() {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleRegenerate() {
    const pathParts = window.location.pathname.split("/");
    const docId = pathParts[3];

    if (!docId) {
      addToast({
        type: "error",
        title: "Error",
        description: "Document ID tidak ditemukan",
      });
      return;
    }

    try {
      setLoading(true);

      addToast({
        type: "info",
        title: "Regenerating Flashcards",
        description: "Flashcard lama akan dihapus dan dibuat ulang...",
      });

      // Delete existing flashcards first
      const deleteRes = await fetch(`/api/flashcards/${docId}`, {
        method: "DELETE",
      });

      // Generate new flashcards
      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId: docId,
        }),
      });

      const data = await response.json();

      if (!data.success && data.error) {
        throw new Error(data.error);
      }

      addToast({
        type: "success",
        title: "Flashcards Diperbarui!",
        description: `${data.count || 0} flashcard baru sudah siap.`,
      });

      router.refresh();
    } catch (error) {
      console.error(error);
      addToast({
        type: "error",
        title: "Gagal Memperbarui",
        description: error instanceof Error ? error.message : "Terjadi kesalahan.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleRegenerate}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-muted px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 className="h-3 w-3 animate-spin" />
          Regenerating...
        </>
      ) : (
        <>
          <RotateCcw className="h-3 w-3" />
          Generate Ulang
        </>
      )}
    </button>
  );
}

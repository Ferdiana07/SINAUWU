"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast";
import { ClipboardList, Loader2, RotateCcw } from "lucide-react";

export default function GenerateQuizButton() {
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
        title: "Generating Quiz",
        description: "AI sedang membuat quiz untukmu...",
      });

      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId: docId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate quiz");
      }

      addToast({
        type: "success",
        title: "Quiz Berhasil Dibuat!",
        description: "Quiz sudah siap untuk dikerjakan.",
      });

      router.refresh();
    } catch (error) {
      console.error(error);
      addToast({
        type: "error",
        title: "Gagal Membuat Quiz",
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
          <ClipboardList className="h-4 w-4" />
          Generate Quiz
        </>
      )}
    </button>
  );
}

// Regenerate Quiz Button
export function RegenerateQuizButton() {
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
        title: "Regenerating Quiz",
        description: "Quiz lama akan dihapus dan dibuat ulang...",
      });

      // Delete existing quiz first
      await fetch(`/api/quizzes/${docId}`, {
        method: "DELETE",
      });

      // Generate new quiz
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId: docId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to regenerate quiz");
      }

      addToast({
        type: "success",
        title: "Quiz Diperbarui!",
        description: "Quiz baru sudah siap.",
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

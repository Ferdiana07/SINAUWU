"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast";
import { Layers, Loader2 } from "lucide-react";

interface Props {
  documentId: string;
  fullWidth?: boolean;
}

export default function GenerateFlashcardsButton({
  documentId,
  fullWidth = false,
}: Props) {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
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
          documentId,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to generate flashcards");
      }

      addToast({
        type: "success",
        title: "Flashcards Berhasil Dibuat!",
        description: `${data.count} flashcard sudah siap untuk dipelajari.`,
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
    <Button
      variant="secondary"
      onClick={handleGenerate}
      disabled={loading}
      className={fullWidth ? "mt-auto w-full" : undefined}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Layers className="mr-2 h-4 w-4" />
          Generate Flashcards
        </>
      )}
    </Button>
  );
}
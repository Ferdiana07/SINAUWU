"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/toast";
import { ClipboardList, Loader2 } from "lucide-react";

interface Props {
  documentId: string;
  fullWidth?: boolean;
}

export default function GenerateQuizButton({
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
        title: "Generating Quiz",
        description: "AI sedang membuat quiz untukmu...",
      });

      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId,
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
          <ClipboardList className="mr-2 h-4 w-4" />
          Generate Quiz
        </>
      )}
    </Button>
  );
}
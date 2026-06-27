"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  documentId: string;
  fullWidth?: boolean;
}

export default function GenerateFlashcardsButton({
  documentId,
  fullWidth = false,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] =
    useState(false);

  async function handleGenerate() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/flashcards",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            documentId,
          }),
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (data.success) {
        router.refresh();
        alert(
          `Flashcards berhasil dibuat! Jumlah: ${data.count}`
        );
      } else {
        alert(
          "Gagal membuat flashcards"
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Gagal membuat flashcards"
      );
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
      {loading
        ? "Generating..."
        : "Generate Flashcards"}
    </Button>
  );
}

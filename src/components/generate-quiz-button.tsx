"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  documentId: string;
}

export default function GenerateQuizButton({
  documentId,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] =
    useState(false);

  async function handleGenerate() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/quizzes",
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

      if (!response.ok) {
        throw new Error(
          "Failed to generate quiz"
        );
      }

      router.refresh();

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="secondary"
      onClick={handleGenerate}
      disabled={loading}
    >
      {loading
        ? "Generating..."
        : "Generate Quiz"}
    </Button>
  );
}

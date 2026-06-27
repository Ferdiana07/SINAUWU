"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  documentId: string;
  fullWidth?: boolean;
}

export default function GenerateQuizButton({
  documentId,
  fullWidth = false,
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
      className={fullWidth ? "mt-auto w-full" : undefined}
    >
      {loading
        ? "Generating..."
        : "Generate Quiz"}
    </Button>
  );
}

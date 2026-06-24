"use client";

import { useState } from "react";

interface Props {
  documentId: string;
}

export default function GenerateFlashcardsButton({
  documentId,
}: Props) {
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
    <button
      onClick={handleGenerate}
      disabled={loading}
      className="rounded bg-green-600 px-3 py-2 text-white"
    >
      {loading
        ? "Generating..."
        : "Generate Flashcards"}
    </button>
  );
}
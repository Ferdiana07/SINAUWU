"use client";

import { useState } from "react";

interface Props {
  documentId: string;
}

export default function GenerateSummaryButton({
  documentId,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/summary",
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

      alert("Summary berhasil dibuat");
    } catch (error) {
      console.error(error);

      alert("Gagal membuat summary");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className="mt-3 rounded bg-black text-white px-3 py-2"
    >
      {loading
        ? "Generating..."
        : "Generate Summary"}
    </button>
  );
}
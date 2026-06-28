"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/toast";
import { Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  documentId: string;
  fullWidth?: boolean;
}

export default function GenerateSummaryButton({
  documentId,
  fullWidth = false,
}: Props) {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    try {
      setLoading(true);

      addToast({
        type: "info",
        title: "Generating Summary",
        description: "AI sedang membuat rangkuman untukmu...",
      });

      const response = await fetch("/api/summary", {
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
        throw new Error(data.error || "Failed to generate summary");
      }

      addToast({
        type: "success",
        title: "Summary Berhasil Dibuat!",
        description: "Rangkuman sudah siap untuk dibaca.",
      });

      // Refresh page to show the new summary
      window.location.href = `/dashboard/documents/${documentId}/summary`;
    } catch (error) {
      console.error(error);
      addToast({
        type: "error",
        title: "Gagal Membuat Summary",
        description: error instanceof Error ? error.message : "Terjadi kesalahan yang tidak diketahui.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleGenerate}
      disabled={loading}
      className={cn(
        "bg-blue-600 hover:bg-blue-700",
        fullWidth ? "mt-auto w-full" : ""
      )}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Summary
        </>
      )}
    </Button>
  );
}

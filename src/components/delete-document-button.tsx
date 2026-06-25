"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  documentId: string;
}

export default function DeleteDocumentButton({
  documentId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleDelete() {
    const confirmed =
      window.confirm(
        "Yakin ingin menghapus dokumen ini?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/documents/${documentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Gagal menghapus dokumen"
        );
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Gagal menghapus dokumen"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading
        ? "Deleting..."
        : "Delete"}
    </Button>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded bg-red-600 px-3 py-2 text-white"
    >
      {loading
        ? "Deleting..."
        : "Delete"}
    </button>
  );
}
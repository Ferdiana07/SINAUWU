import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { DocumentsClient } from "@/components/documents-client";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DocumentsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const documents = await prisma.document.findMany({
    where: { userId },
    include: {
      summary: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Serialize for client component
  const serializedDocuments = documents.map((doc) => ({
    id: doc.id,
    title: doc.title,
    fileName: doc.fileName,
    status: doc.status,
    createdAt: doc.createdAt,
    summary: doc.summary,
  }));

  return <DocumentsClient initialDocuments={serializedDocuments} />;
}

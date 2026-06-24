import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DocumentPage(
  { params }: PageProps
) {
  const { id } = await params;

  const document =
    await prisma.document.findUnique({
      where: {
        id,
      },
      include: {
        summary: true,
      },
    });

  if (!document) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        {document.title}
      </h1>

      {!document.summary ? (
        <div>
          Summary belum dibuat.
        </div>
      ) : (
        <div className="space-y-6">

          <div>
            <h2 className="font-semibold">
              Short Summary
            </h2>

            <p>
              {
                document.summary
                  .shortSummary
              }
            </p>
          </div>

          <div>
            <h2 className="font-semibold">
              Detailed Summary
            </h2>

            <p>
              {
                document.summary
                  .detailedSummary
              }
            </p>
          </div>

          <div>
            <h2 className="font-semibold">
              Key Points
            </h2>

            <pre>
              {JSON.stringify(
                document.summary
                  .keyPoints,
                null,
                2
              )}
            </pre>
          </div>

        </div>
      )}
    </div>
  );
}
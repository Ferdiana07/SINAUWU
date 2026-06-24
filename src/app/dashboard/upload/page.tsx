import Link from "next/link";
import { UploadPdfForm } from "@/components/upload-pdf-form";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Kembali ke dashboard
          </Link>

          <div className="mt-6">
            <Badge variant="outline">Upload PDF</Badge>
            <h1 className="mt-4 text-3xl font-bold">Upload Materi Kuliah</h1>
            <p className="mt-2 text-muted-foreground">
              Upload file PDF materi kuliahmu. Untuk tahap ini, SINAUWU akan
              menyimpan metadata dokumen terlebih dahulu.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <UploadPdfForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
import Link from "next/link";
import { UploadPdfForm } from "@/components/upload-pdf-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopHeader } from "@/components/top-header";
import { Upload, FileText, Sparkles, Layers, ClipboardList, CheckCircle } from "lucide-react";

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <TopHeader
        title="Upload Dokumen"
        description="Tambahkan materi PDF baru untuk diproses dengan AI"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload Form */}
        <div className="lg:col-span-2">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Form Upload</CardTitle>
                  <p className="text-sm text-muted-foreground">Pilih file PDF yang ingin diproses</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <UploadPdfForm />
            </CardContent>
          </Card>
        </div>

        {/* Guidelines */}
        <div className="space-y-4">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Tips Upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Format PDF</p>
                  <p className="text-xs text-muted-foreground">Hanya file PDF yang didukung</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                  <span className="text-sm font-bold">5MB</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Maksimal Ukuran</p>
                  <p className="text-xs text-muted-foreground">File PDF tidak lebih dari 5 MB</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <span className="text-sm font-bold">TXT</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Ekstraksi Teks</p>
                  <p className="text-xs text-muted-foreground">AI akan ekstrak teks dari PDF</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-600" />
                Apa yang terjadi setelah upload?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">
                  1
                </div>
                <p className="text-sm text-muted-foreground">PDF diproses dan teks diekstrak</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">
                  2
                </div>
                <p className="text-sm text-muted-foreground">AI membuat rangkuman otomatis</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">
                  3
                </div>
                <p className="text-sm text-muted-foreground">Flashcard dan quiz siap dibuat</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
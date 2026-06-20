export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Dashboard SINAUWU</h1>

        <p className="mt-3 text-slate-400">
          Di sini nanti user bisa upload PDF, melihat rangkuman,
          membuka flashcard, dan mengerjakan kuis.
        </p>

        <div className="mt-8 rounded-2xl border border-dashed border-slate-700 p-8">
          <h2 className="text-xl font-semibold">Belum ada dokumen</h2>
          <p className="mt-2 text-slate-400">
            Fitur upload PDF akan kita buat di langkah berikutnya.
          </p>
        </div>
      </div>
    </main>
  );
}
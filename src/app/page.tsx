import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
          AI Learning Assistant for Students
        </p>

        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
          SINAUWU
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Upload materi PDF kuliahmu, lalu ubah menjadi rangkuman,
          flashcard, dan kuis latihan dengan bantuan AI.
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="/dashboard"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Mulai Belajar
          </a>

          <a
            href="#features"
            className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-900"
          >
            Lihat Fitur
          </a>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto grid max-w-5xl gap-6 px-6 pb-24 md:grid-cols-3"
      >
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">PDF Summary</h2>
          <p className="mt-3 text-slate-400">
            Materi panjang diringkas menjadi poin-poin yang lebih mudah
            dipahami.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">Flashcard</h2>
          <p className="mt-3 text-slate-400">
            Konsep penting diubah menjadi kartu tanya-jawab untuk latihan cepat.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">Quiz Generator</h2>
          <p className="mt-3 text-slate-400">
            Sistem membuat soal latihan otomatis berdasarkan isi materi.
          </p>
        </div>
      </section>
    </main>
  );
}
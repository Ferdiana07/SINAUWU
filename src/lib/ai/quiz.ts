import { openrouter } from "./openrouter";

export interface GeneratedQuiz {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation: string;
}

export async function generateQuiz(
  text: string
): Promise<GeneratedQuiz[]> {

  const truncatedText =
    text.slice(0, 12000);

  const completion =
    await openrouter.chat.completions.create({
      model:
        "openai/gpt-oss-20b:free",

      messages: [
        {
          role: "system",
          content: `
Kamu adalah pembuat soal kuliah.

Buat 10 soal pilihan ganda
berdasarkan materi.

SEMUA soal dan penjelasan
harus menggunakan Bahasa Indonesia.

Kembalikan HANYA JSON valid.
Balas hanya JSON array valid.
Semua property name wajib memakai double quote.
Jangan markdown.
Jangan komentar.
Jangan trailing comma.
correctAnswer hanya A, B, C, atau D.

Format:

[
  {
    "question":"",
    "optionA":"",
    "optionB":"",
    "optionC":"",
    "optionD":"",
    "correctAnswer":"A",
    "explanation":""
  }
]
`,
        },

        {
          role: "user",
          content: truncatedText,
        },
      ],
    });

  const content =
    completion.choices[0]
      ?.message?.content;

  if (!content) {
    throw new Error(
      "Quiz generation failed"
    );
  }

  const cleanedContent =
  content
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();

    return JSON.parse(cleanedContent);
}
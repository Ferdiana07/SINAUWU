import { openrouter } from "./openrouter";

export interface FlashcardItem {
  question: string;
  answer: string;
}

export async function generateFlashcards(
  text: string
): Promise<FlashcardItem[]> {
  const response =
    await openrouter.chat.completions.create({
      model: "openai/gpt-oss-20b:free",

      messages: [
        {
          role: "system",
          content: `
Kamu adalah educational assistant.

Buat 10 flashcard dari materi berikut.

SEMUA pertanyaan dan jawaban HARUS menggunakan Bahasa Indonesia.

Jika terdapat istilah teknis bahasa Inggris
seperti Risk Assessment, Threat, atau Vulnerability,
boleh dipertahankan tetapi penjelasannya tetap
harus menggunakan Bahasa Indonesia.

Kembalikan HANYA JSON valid.

Format:

[
  {
    "question": "...",
    "answer": "..."
  }
]
`,
        },
        {
          role: "user",
          content: text.slice(0, 12000),
        },
      ],
    });

  const content =
    response.choices[0].message.content;

  if (!content) {
    throw new Error(
      "No flashcard content generated"
    );
  }

  return JSON.parse(content);
}
import { openrouter } from "./openrouter";

export type GeneratedSummary = {
  shortSummary: string;
  detailedSummary: string;
  keyPoints: string[];
};

function extractJson(text: string) {
  const withoutFence = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const start = withoutFence.indexOf("{");
  const end = withoutFence.lastIndexOf("}");

  if (start === -1 || end === -1 || end < start) {
    throw new Error("AI response does not contain valid JSON");
  }

  return withoutFence.slice(start, end + 1);
}

function parseSummary(text: string): GeneratedSummary {
  const parsed = JSON.parse(
    extractJson(text)
  ) as Partial<GeneratedSummary>;

  if (
    typeof parsed.shortSummary !== "string" ||
    typeof parsed.detailedSummary !== "string" ||
    !Array.isArray(parsed.keyPoints)
  ) {
    throw new Error(
      "AI response JSON does not match summary format"
    );
  }

  return {
    shortSummary: parsed.shortSummary.trim(),
    detailedSummary: parsed.detailedSummary.trim(),
    keyPoints: parsed.keyPoints
      .filter(
        (item): item is string =>
          typeof item === "string"
      )
      .map((item) => item.trim())
      .filter(Boolean),
  };
}

export async function generateSummary(
  text: string
): Promise<GeneratedSummary> {
  const completion =
    await openrouter.chat.completions.create({
      model: "google/gemma-4-31b-it:free",

      messages: [
        {
          role: "system",
          content: `
Kamu adalah AI pembantu belajar untuk mahasiswa.

Tugasmu adalah membuat ringkasan materi dalam bahasa Indonesia yang jelas,
rapi, dan mudah dipakai untuk belajar.

Balas HANYA dengan JSON valid.

Format JSON wajib:

{
  "shortSummary": "Ringkasan pendek 2-4 kalimat.",
  "detailedSummary": "Ringkasan detail beberapa paragraf.",
  "keyPoints": [
    "Poin penting pertama",
    "Poin penting kedua",
    "Poin penting ketiga"
  ]
}
`,
        },
        {
          role: "user",
          content: text.slice(0, 50000),
        },
      ],
    });

  const content =
    completion.choices[0]?.message?.content ?? "";

  return parseSummary(content);
}
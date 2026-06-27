import { extractText } from "unpdf";

function cleanExtractedText(text: string) {
  return text
    .replace(/\u0000/g, "")
    .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function extractPdfText(buffer: Buffer) {
  const uint8Array = new Uint8Array(buffer);

  const result = await extractText(uint8Array);
  const text = Array.isArray(result.text)
    ? result.text.join("\n\n")
    : result.text;

  return cleanExtractedText(text);
}

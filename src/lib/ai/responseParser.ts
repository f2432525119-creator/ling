type ParseResult = {
  candidate: unknown;
  parserWarnings: string[];
};

function tryParseJson(text: string): unknown | null {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function extractJsonObject(raw: string): string | null {
  const first = raw.indexOf("{");
  const last = raw.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) return null;
  return raw.slice(first, last + 1);
}

export function parseNarrativeResponse(rawOutput: string): ParseResult {
  const parserWarnings: string[] = [];
  const trimmed = rawOutput.trim();

  const direct = tryParseJson(trimmed);
  if (direct) {
    return { candidate: direct, parserWarnings };
  }

  const codeBlockMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (codeBlockMatch?.[1]) {
    const fromCodeBlock = tryParseJson(codeBlockMatch[1].trim());
    if (fromCodeBlock) {
      parserWarnings.push("Parsed JSON from markdown code block.");
      return { candidate: fromCodeBlock, parserWarnings };
    }
  }

  const extracted = extractJsonObject(trimmed);
  if (extracted) {
    const parsed = tryParseJson(extracted);
    if (parsed) {
      parserWarnings.push("Parsed JSON from mixed model output.");
      return { candidate: parsed, parserWarnings };
    }
  }

  throw new Error("Model output is not valid JSON.");
}

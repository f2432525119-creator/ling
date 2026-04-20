import type { NarrativeApiRequest } from "@/types/narrative";

function buildSystemPrompt(): string {
  return [
    "You are a state-driven narrative engine.",
    "Return one JSON object only with keys: narration, choices, state_update, next_node_meta.",
    "Never output full world state.",
    "state_update.source must be \"ai\".",
    "state_update.ops must be minimal and only represent already happened changes.",
    "ops may be an empty array when no state change has actually happened in this turn.",
    "state_update.base_tick must exactly match the input world_state.tick.",
    "next_node_meta.type should be one of: scene, decision, event, transition, revelation, consequence.",
  ].join(" ");
}

function buildUserPrompt(context: NarrativeApiRequest): string {
  return JSON.stringify(
    {
      instruction:
        "Generate the next narrative turn under world constraints.",
      context,
    },
    null,
    2,
  );
}

export async function generateNarrativeRaw(
  context: NarrativeApiRequest,
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: buildUserPrompt(context) },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    throw new Error(`Model request failed with status ${response.status}.`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const rawContent = data.choices?.[0]?.message?.content;
  if (!rawContent) {
    throw new Error("Model response did not include content.");
  }
  return rawContent;
}

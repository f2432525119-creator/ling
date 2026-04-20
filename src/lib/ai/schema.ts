import { z } from "zod";

import type { StructuredAIResponse } from "@/types/narrative";
import type { StateUpdate, UpdateOp } from "@/types/world";

const choiceSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  intent: z.string().min(1).optional(),
  risk_level: z.number().min(0).max(100).optional(),
});

const nodeMetaSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  arc: z.string().min(1),
});

const opSchema = z.discriminatedUnion("op", [
  z.object({ op: z.literal("set_location"), location: z.string().min(1) }),
  z.object({ op: z.literal("set_tension"), tension: z.number() }),
  z.object({ op: z.literal("set_weather"), weather: z.string().min(1) }),
  z.object({ op: z.literal("set_timeline"), timeline: z.string().min(1) }),
  z.object({ op: z.literal("set_flag"), flag: z.string().min(1) }),
  z.object({ op: z.literal("unset_flag"), flag: z.string().min(1) }),
  z.object({
    op: z.literal("set_relation"),
    sourceCharacterId: z.string().min(1),
    targetCharacterId: z.string().min(1),
    relation: z.object({
      relation: z.string().min(1),
      trust: z.number(),
      tension: z.number().optional(),
      tags: z.array(z.string()).optional(),
      updatedAtTick: z.number().optional(),
    }),
  }),
]);

const stateUpdateSchema = z.object({
  update_id: z.string().min(1),
  source: z.literal("ai"),
  reason: z.string().min(1),
  base_tick: z.number(),
  ops: z.array(opSchema),
});

const responseSchema = z.object({
  narration: z.string().min(1),
  choices: z.array(choiceSchema),
  state_update: stateUpdateSchema,
  next_node_meta: nodeMetaSchema,
});

type NormalizeResult = {
  response: StructuredAIResponse;
  warnings: string[];
};

function sanitizeOps(inputOps: unknown[], warnings: string[]): UpdateOp[] {
  const ops: UpdateOp[] = [];
  for (const [index, op] of inputOps.entries()) {
    const parsed = opSchema.safeParse(op);
    if (!parsed.success) {
      warnings.push(`Dropped invalid op at index ${index}.`);
      continue;
    }
    ops.push(parsed.data);
  }
  return ops;
}

export function normalizeAndValidateResponse(
  candidate: unknown,
  baseTick: number,
): NormalizeResult {
  const warnings: string[] = [];
  const raw = typeof candidate === "object" && candidate !== null ? candidate : {};
  const partial = raw as Record<string, unknown>;

  const sourceUpdate =
    typeof partial.state_update === "object" && partial.state_update !== null
      ? (partial.state_update as Record<string, unknown>)
      : {};

  const opsRaw = Array.isArray(sourceUpdate.ops) ? sourceUpdate.ops : [];
  if (!Array.isArray(sourceUpdate.ops)) {
    warnings.push("state_update.ops missing or invalid; defaulted to [].");
  }

  const sanitizedOps = sanitizeOps(opsRaw, warnings);

  const normalizedUpdate: StateUpdate = {
    update_id:
      typeof sourceUpdate.update_id === "string" && sourceUpdate.update_id.trim()
        ? sourceUpdate.update_id
        : `upd-ai-${Date.now()}`,
    source: "ai",
    reason:
      typeof sourceUpdate.reason === "string" && sourceUpdate.reason.trim()
        ? sourceUpdate.reason
        : "AI generated narrative turn",
    base_tick:
      typeof sourceUpdate.base_tick === "number" ? sourceUpdate.base_tick : baseTick,
    ops: sanitizedOps,
  };

  if (normalizedUpdate.update_id.startsWith("upd-ai-")) {
    warnings.push("state_update.update_id missing; generated update_id.");
  }
  if (sourceUpdate.source !== "ai") {
    warnings.push('state_update.source normalized to "ai".');
  }
  if (typeof sourceUpdate.base_tick !== "number") {
    warnings.push("state_update.base_tick missing; filled with request world tick.");
  }
  if (
    typeof sourceUpdate.base_tick === "number" &&
    sourceUpdate.base_tick !== baseTick
  ) {
    warnings.push(
      `state_update.base_tick (${sourceUpdate.base_tick}) differs from request tick (${baseTick}).`,
    );
  }

  const normalized: StructuredAIResponse = {
    narration:
      typeof partial.narration === "string" && partial.narration.trim()
        ? partial.narration
        : "你暂时没有得到新的有效反馈，局势仍在观察中。",
    choices: Array.isArray(partial.choices)
      ? partial.choices.filter((choice) => choiceSchema.safeParse(choice).success).map((choice) => choice as StructuredAIResponse["choices"][number])
      : [],
    state_update: normalizedUpdate,
    next_node_meta:
      typeof partial.next_node_meta === "object" && partial.next_node_meta !== null
        ? ({
            id:
              typeof (partial.next_node_meta as Record<string, unknown>).id === "string" &&
              (partial.next_node_meta as Record<string, unknown>).id
                ? ((partial.next_node_meta as Record<string, unknown>).id as string)
                : `node-${Date.now()}`,
            title:
              typeof (partial.next_node_meta as Record<string, unknown>).title ===
                "string" &&
              (partial.next_node_meta as Record<string, unknown>).title
                ? ((partial.next_node_meta as Record<string, unknown>).title as string)
                : "剧情推进",
            arc:
              typeof (partial.next_node_meta as Record<string, unknown>).arc ===
                "string" &&
              (partial.next_node_meta as Record<string, unknown>).arc
                ? ((partial.next_node_meta as Record<string, unknown>).arc as string)
                : "主线",
          } as StructuredAIResponse["next_node_meta"])
        : {
            id: `node-${Date.now()}`,
            title: "剧情推进",
            arc: "主线",
          },
  };

  if (!Array.isArray(partial.choices)) {
    warnings.push("choices missing or invalid; defaulted to [].");
  }
  if (!partial.next_node_meta) {
    warnings.push("next_node_meta missing; generated default node metadata.");
  }

  const parsed = responseSchema.safeParse(normalized);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message).join("; ");
    throw new Error(`Normalized response failed schema validation: ${issues}`);
  }

  return { response: parsed.data, warnings };
}

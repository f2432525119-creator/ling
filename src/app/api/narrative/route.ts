import { NextResponse } from "next/server";

import { generateNarrativeRaw } from "@/lib/ai/narrativeEngine";
import { parseNarrativeResponse } from "@/lib/ai/responseParser";
import { normalizeAndValidateResponse } from "@/lib/ai/schema";
import { sampleAiResponse } from "@/data/mock/sampleAiResponse";
import type {
  NarrativeApiRequest,
  NarrativeApiMeta,
  StructuredAIResponse,
} from "@/types/narrative";

type NarrativeApiPayload = StructuredAIResponse & {
  meta: NarrativeApiMeta;
};

function injectMockResponse(baseTick: number): {
  response: StructuredAIResponse;
  warnings: string[];
} {
  const warnings: string[] = [];
  const stateUpdate = { ...sampleAiResponse.state_update };

  if (!stateUpdate.update_id) {
    stateUpdate.update_id = `upd-mock-${Date.now()}`;
    warnings.push("Mock response missing update_id; generated update_id.");
  }
  if (stateUpdate.base_tick !== baseTick) {
    stateUpdate.base_tick = baseTick;
    warnings.push("Mock response base_tick adjusted to request world tick.");
  }
  if (stateUpdate.source !== "ai") {
    stateUpdate.source = "ai";
    warnings.push('Mock response source normalized to "ai".');
  }

  return {
    response: {
      ...sampleAiResponse,
      state_update: stateUpdate,
    },
    warnings,
  };
}

export async function POST(request: Request): Promise<NextResponse<NarrativeApiPayload>> {
  let body: NarrativeApiRequest;
  try {
    body = (await request.json()) as NarrativeApiRequest;
  } catch {
    const mock = injectMockResponse(0);
    return NextResponse.json({
      ...mock.response,
      meta: {
        fallback_used: true,
        warnings: ["Invalid request JSON. Returned mock response.", ...mock.warnings],
        parser_warnings: [],
      },
    });
  }

  const baseTick = body.world_state?.tick;
  if (typeof baseTick !== "number") {
    const mock = injectMockResponse(0);
    return NextResponse.json({
      ...mock.response,
      meta: {
        fallback_used: true,
        warnings: ["world_state.tick is required. Returned mock response.", ...mock.warnings],
        parser_warnings: [],
      },
    });
  }

  const useMock = body.runtime?.use_mock ?? process.env.NARRATIVE_USE_MOCK === "1";
  if (useMock) {
    const mock = injectMockResponse(baseTick);
    return NextResponse.json({
      ...mock.response,
      meta: {
        fallback_used: true,
        warnings: ["Mock mode enabled.", ...mock.warnings],
        parser_warnings: [],
      },
    });
  }

  try {
    const rawOutput = await generateNarrativeRaw(body);
    const parsed = parseNarrativeResponse(rawOutput);
    const normalized = normalizeAndValidateResponse(parsed.candidate, baseTick);

    return NextResponse.json({
      ...normalized.response,
      meta: {
        fallback_used: false,
        warnings: normalized.warnings,
        parser_warnings: parsed.parserWarnings,
      },
    });
  } catch (error) {
    const mock = injectMockResponse(baseTick);
    const message = error instanceof Error ? error.message : "Unknown narrative error.";
    return NextResponse.json({
      ...mock.response,
      meta: {
        fallback_used: true,
        warnings: [`AI pipeline failed: ${message}`, ...mock.warnings],
        parser_warnings: [],
      },
    });
  }
}

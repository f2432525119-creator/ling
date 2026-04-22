import { create } from "zustand";

import { initialWorldState } from "@/data/mock/initialWorldState";
import type {
  DelayedEffect,
  StateUpdate,
  TriggerCondition,
  UpdateOp,
  WorldWarning,
  WorldState,
} from "@/types/world";

type WorldStateStore = {
  worldState: WorldState;
  warnings: WorldWarning[];
  applyStateUpdate: (update: StateUpdate) => void;
  cancelDelayedEffect: (effectId: string) => void;
  getPendingDelayedEffects: () => DelayedEffect[];
  resetWorld: () => void;
};

function createSystemUpdateFromDelayedEffect(
  effect: DelayedEffect,
  baseTick: number,
): StateUpdate {
  return {
    update_id: `sys-delayed-${effect.id}-${Date.now()}`,
    source: "system",
    reason: "delayed_effect",
    ops: effect.payload,
    base_tick: baseTick,
  };
}

function evaluateTriggerCondition(
  worldState: WorldState,
  condition: TriggerCondition,
): boolean {
  switch (condition.type) {
    case "flag_exists":
      return worldState.flags.includes(condition.flag);

    case "relation_trust_at_least": {
      const relation =
        worldState.relations[condition.sourceCharacterId]?.[
          condition.targetCharacterId
        ];
      return (relation?.trust ?? 0) >= condition.value;
    }

    case "tick_at_least":
      return worldState.tick >= condition.value;

    default:
      return false;
  }
}

function shouldTriggerDelayedEffect(
  effect: DelayedEffect,
  worldState: WorldState,
): boolean {
  if (effect.status !== "pending") return false;

  if (effect.applyAtTick !== undefined && worldState.tick < effect.applyAtTick) {
    return false;
  }

  if (!effect.triggerConditions || effect.triggerConditions.length === 0) {
    return true;
  }

  return effect.triggerConditions.every((condition) =>
    evaluateTriggerCondition(worldState, condition),
  );
}

function applyOp(worldState: WorldState, op: UpdateOp): WorldState {
  switch (op.op) {
    case "set_location":
      return { ...worldState, location: op.location };

    case "set_tension":
      return { ...worldState, tension: op.tension };

    case "set_weather":
      return { ...worldState, weather: op.weather };

    case "set_timeline":
      return { ...worldState, timeline: op.timeline };

    case "set_flag":
      return {
        ...worldState,
        flags: worldState.flags.includes(op.flag)
          ? worldState.flags
          : [...worldState.flags, op.flag],
      };

    case "unset_flag":
      return {
        ...worldState,
        flags: worldState.flags.filter((flag) => flag !== op.flag),
      };

    case "set_relation":
      return {
        ...worldState,
        relations: {
          ...worldState.relations,
          [op.sourceCharacterId]: {
            ...(worldState.relations[op.sourceCharacterId] ?? {}),
            [op.targetCharacterId]: {
              ...op.relation,
              updatedAtTick: worldState.tick,
            },
          },
        },
      };

    default:
      return worldState;
  }
}

function applyOps(worldState: WorldState, ops: UpdateOp[]): WorldState {
  return ops.reduce((acc, op) => applyOp(acc, op), worldState);
}

function materializeDelayedEffects(
  worldState: WorldState,
): { worldState: WorldState; warnings: WorldWarning[] } {
  let nextWorldState = worldState;
  const warnings: WorldWarning[] = [];

  for (const effect of nextWorldState.delayedEffects) {
    if (!shouldTriggerDelayedEffect(effect, nextWorldState)) continue;

    if (effect.payload.length === 0) {
      nextWorldState = {
        ...nextWorldState,
        delayedEffects: nextWorldState.delayedEffects.map((item) =>
          item.id === effect.id
            ? {
                ...item,
                status: "failed",
                failedAtTick: nextWorldState.tick,
                failureReason: "empty payload",
              }
            : item,
        ),
      };
      warnings.push({
        code: "DELAYED_EFFECT_FAILED",
        message: `delayed effect failed: ${effect.id} (empty payload)`,
        tick: nextWorldState.tick,
      });
      continue;
    }

    const systemUpdate = createSystemUpdateFromDelayedEffect(effect, nextWorldState.tick);
    try {
      nextWorldState = applyOps(nextWorldState, systemUpdate.ops);
    } catch (error) {
      const reason =
        error instanceof Error ? error.message : "unknown delayed effect failure";
      nextWorldState = {
        ...nextWorldState,
        delayedEffects: nextWorldState.delayedEffects.map((item) =>
          item.id === effect.id
            ? {
                ...item,
                status: "failed",
                failedAtTick: nextWorldState.tick,
                failureReason: reason,
              }
            : item,
        ),
      };
      warnings.push({
        code: "DELAYED_EFFECT_FAILED",
        message: `delayed effect failed: ${effect.id} (${reason})`,
        tick: nextWorldState.tick,
      });
      continue;
    }

    nextWorldState = {
      ...nextWorldState,
      delayedEffects: nextWorldState.delayedEffects.map((item) =>
        item.id === effect.id
          ? {
              ...item,
              status: "applied",
              appliedAtTick: nextWorldState.tick,
            }
          : item,
      ),
      lastUpdateId: systemUpdate.update_id,
    };

    warnings.push({
      code: "DELAYED_EFFECT_APPLIED",
      message: `delayed effect applied: ${effect.id}`,
      updateId: systemUpdate.update_id,
      tick: nextWorldState.tick,
    });
  }

  return { worldState: nextWorldState, warnings };
}

export const useWorldStore = create<WorldStateStore>((set, get) => ({
  worldState: initialWorldState,
  warnings: [],

  applyStateUpdate: (update) =>
    set((state) => {
      const currentTick = state.worldState.tick;
      const nextWarnings = [...state.warnings];

      if (update.base_tick !== undefined && update.base_tick !== currentTick) {
        nextWarnings.push({
          code: "BASE_TICK_MISMATCH",
          message: `base_tick mismatch: expected ${currentTick}, got ${update.base_tick}`,
          updateId: update.update_id,
          tick: currentTick,
        });
      }

      let nextWorldState = applyOps(state.worldState, update.ops);
      nextWorldState = {
        ...nextWorldState,
        tick: currentTick + 1,
        lastUpdateId: update.update_id,
      };

      const delayedResult = materializeDelayedEffects(nextWorldState);

      return {
        worldState: delayedResult.worldState,
        warnings: [...nextWarnings, ...delayedResult.warnings],
      };
    }),

  cancelDelayedEffect: (effectId) =>
    set((state) => {
      const effect = state.worldState.delayedEffects.find((item) => item.id === effectId);
      if (!effect || effect.status !== "pending") {
        return state;
      }

      return {
        worldState: {
          ...state.worldState,
          delayedEffects: state.worldState.delayedEffects.map((item) =>
            item.id === effectId ? { ...item, status: "cancelled" } : item,
          ),
        },
        warnings: [
          ...state.warnings,
          {
            code: "DELAYED_EFFECT_CANCELLED",
            message: `delayed effect cancelled: ${effectId}`,
            tick: state.worldState.tick,
          },
        ],
      };
    }),

  getPendingDelayedEffects: () => {
    const { worldState } = get();
    return worldState.delayedEffects.filter((effect) => effect.status === "pending");
  },

  resetWorld: () =>
    set({
      worldState: initialWorldState,
      warnings: [],
    }),
}));
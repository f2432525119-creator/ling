// =========================
// Character
// =========================

export type Character = {
  id: string;
  name: string;

  // 基础关系展示（UI用）
  relationLabel?: string;

  // 数值属性（可扩展）
  trust?: number;
  status?: string;

  // 扩展字段
  tags?: string[];
  lastUpdatedTick?: number;
};


// =========================
// Relation
// =========================

export type Relation = {
  relation: string;
  trust: number;
  tension?: number;
  tags?: string[];
  updatedAtTick?: number;
};


// =========================
// TriggerCondition
// =========================

export type TriggerCondition =
  | { type: "flag_exists"; flag: string }
  | {
      type: "relation_trust_at_least";
      sourceCharacterId: string;
      targetCharacterId: string;
      value: number;
    }
  | { type: "tick_at_least"; value: number };


// =========================
// Update Operations
// =========================

export type UpdateOp =
  | { op: "set_location"; location: string }
  | { op: "set_tension"; tension: number }
  | { op: "set_weather"; weather: string }
  | { op: "set_timeline"; timeline: string }
  | { op: "set_flag"; flag: string }
  | { op: "unset_flag"; flag: string }
  | {
      op: "set_relation";
      sourceCharacterId: string;
      targetCharacterId: string;
      relation: Relation;
    };


// =========================
// DelayedEffect（增强版）
// =========================

export type DelayedEffect = {
  id: string;

  payload: UpdateOp[];

  // 触发方式（二选一或组合）
  applyAtTick?: number;
  triggerConditions?: TriggerCondition[];

  // 生命周期（替代 consumed）
  status: "pending" | "applied" | "cancelled" | "failed";

  createdAtTick: number;
  appliedAtTick?: number;
  failedAtTick?: number;
  failureReason?: string;

  note?: string;
};


// =========================
// StateUpdate（带版本控制）
// =========================

export type StateUpdate = {
  update_id: string;
  source: "ai" | "system";
  reason: string;

  ops: UpdateOp[];

  // 关键：乐观锁
  base_tick?: number;
};

export type WorldWarningCode =
  | "BASE_TICK_MISMATCH"
  | "DELAYED_EFFECT_APPLIED"
  | "DELAYED_EFFECT_FAILED"
  | "DELAYED_EFFECT_CANCELLED";

export type WorldWarning = {
  code: WorldWarningCode;
  message: string;
  updateId?: string;
  tick: number;
};


// =========================
// WorldState（核心真相）
// =========================

export type WorldState = {
  timeline: string;

  // 强烈建议必填（不要可选）
  tick: number;

  location: string;
  weather: string;
  tension: number;

  // 改为 map（O(1) 查询）
  characters: Record<string, Character>;

  // 双层关系图
  relations: {
    [sourceCharacterId: string]: {
      [targetCharacterId: string]: Relation;
    };
  };

  delayedEffects: DelayedEffect[];

  flags: string[];

  // ⭐ 强烈建议增加（未来用）
  lastUpdateId?: string;
};


// =========================
// ❌ 删除这个类型（非常重要）
// =========================

// export type WorldStateUpdate = Partial<WorldState> ...
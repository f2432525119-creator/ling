/** 消息角色类型 */
export type MessageRole = "narrator" | "character" | "user";

/** 消息数据结构 */
export interface NarrativeMessage {
  id: string;
  role: MessageRole;
  content: string;
  /** 角色名称（仅 character 类型需要） */
  characterName?: string;
  /** 时间戳 */
  timestamp?: number;
}

/** NarrativePanel 组件 Props */
export interface NarrativePanelProps {
  /** 消息列表 */
  messages?: NarrativeMessage[];
  /** 是否显示打字机效果 */
  enableTypewriter?: boolean;
  /** 打字速度（ms/字符） */
  typewriterSpeed?: number;
  /** 面板标题 */
  title?: string;
}

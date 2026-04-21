# Gemini 前端开发提示词（基于当前仓库）

## ① 项目理解

你正在接手一个 **“书籍分支叙事体验产品”** 的前端：

- 用户输入书名与剧情行动。
- 前端将输入发送给 `/api/narrative`。
- 后端（Claude 驱动）返回结构化叙事数据：`narration`、`choices`、`state_update`、`next_node_meta`。
- 前端负责四个核心表现层：
  1) 剧情对话区（narration/user 消息）
  2) 选项交互区（choices）
  3) 分支树可视化（React Flow）
  4) 世界状态面板（timeline/location/tension/flags/relations 等）
- 架构已采用 Next.js App Router + React + Zustand，多 store 分层已明确，不可破坏。

---

## ② 当前前端结构分析

### 页面与布局
- `src/app/page.tsx`：当前首页是入口页，点击进入 `/world`。
- `src/app/world/page.tsx`：叙事工作台主页面，使用 `AppShell` 三栏布局。
- `src/components/layout/AppShell.tsx`：12 栏网格，左（聊天）中（图）右（世界状态）。
- `src/components/layout/TopBar.tsx`：展示 `bookTitle` 与 `mode`（来自 `useSessionStore`）。

### 聊天/叙事
- `src/components/chat/ChatPanel.tsx`：读取 `useNarrativeStore`，提交输入后调用：
  - `requestNarrative(userInput)` 请求 `/api/narrative`
  - `commitNarrativeTurn({ userText, response })` 更新叙事/世界/图
- `src/components/chat/MessageList.tsx`：渲染消息气泡（user / narrator）。
- `src/components/chat/InputBox.tsx`：输入框与发送按钮。

### 分支树
- `src/components/graph/BranchGraph.tsx`：React Flow 画布。
- `src/stores/useGraphStore.ts`：只维护图视图状态（nodes/edges/selectedNodeId）。
- `src/lib/graph/graphBuilder.ts`：负责 `NarrativeNode[] -> ReactFlow nodes/edges` 映射。

### 世界状态
- `src/components/world/WorldStatePanel.tsx`：展示 `worldState` 基本字段。
- `src/components/world/ConsistencyIndicator.tsx`：世界一致性状态 UI。
- `src/stores/useWorldStore.ts`：管理世界真相、状态更新、延迟效果、warnings。

### 会话与边界
- `src/stores/useSessionStore.ts`：bookTitle/mode/preferences。
- `src/stores/useNarrativeStore.ts`：叙事真相（nodes/currentNode/messages）+ 调 API + 提交回合。
- `src/app/api/narrative/route.ts`：唯一叙事接口入口，支持 mock/fallback。

---

## ③ Gemini 应遵守的约束

1. **严格遵守 store 职责边界**
   - `useNarrativeStore`：只管剧情真相（nodes/messages/currentNode）与叙事请求流程。
   - `useWorldStore`：只管世界状态真相与更新规则。
   - `useGraphStore`：只管可视化状态（graph nodes/edges/selected）。
   - `useSessionStore`：只管会话信息（bookTitle/mode/preferences）。

2. **graphBuilder 单一职责**
   - `graphBuilder` 仅做 `narrative nodes -> graph nodes/edges` 映射。
   - 不在 `graphBuilder` 中引入请求、会话、world 业务逻辑。

3. **UI 组件仅做展示与交互分发**
   - 不把复杂业务逻辑塞入组件。
   - 不在组件中直接改写多个 store 的内部数据结构。

4. **前端只消费 `/api/narrative` 返回**
   - 不重写后端叙事策略。
   - 不在前端伪造“另一个叙事引擎”。

5. **改动范围优先级**
   - 优先修改：`src/app/world/page.tsx`、`src/components/chat/*`、`src/components/graph/*`、`src/components/world/*`、必要时 `src/components/layout/*`。
   - 谨慎修改：`src/stores/*`（仅在类型接线或最小必要字段时）。
   - 默认不动：`src/app/api/narrative/route.ts`、`src/lib/ai/*`、`src/lib/graph/graphBuilder.ts`（除非明确是映射显示需求）。

6. **UI 风格**
   - 极简、纯色、现代化。
   - 低饱和背景 + 黑白灰主色 + 1 个轻量强调色。
   - 高可读性、明确层级、统一圆角与边框密度。

---

## ④ 可直接复制的 Gemini 总提示词

你现在是该仓库的前端协作工程师。请在 **不破坏现有 Zustand store 分层** 的前提下，继续完成“书籍分支叙事体验产品”的首页叙事工作台。

【目标】
实现并完善以下区域，形成完整可用体验：
1) 首页叙事界面（工作台）
2) 对话区 + 选项区
3) 分支树可视化区
4) 世界状态展示区
5) 节点选中后的信息面板
6) 极简、纯色、现代化 UI

【硬性架构约束】
- useNarrativeStore 只管剧情真相。
- useWorldStore 只管世界状态。
- useGraphStore 只管可视化状态。
- useSessionStore 只管会话信息。
- graphBuilder 只负责 narrative nodes -> graph nodes/edges 映射。
- 不要把业务逻辑塞进 UI 组件。
- 前端只消费 /api/narrative 返回，不重写后端叙事逻辑。

【改动策略】
- 先阅读并复用现有结构：
  - 页面：`src/app/world/page.tsx`
  - 聊天：`src/components/chat/*`
  - 图谱：`src/components/graph/*`
  - 世界状态：`src/components/world/*`
  - 布局：`src/components/layout/*`
  - store：`src/stores/*`
- 以“新增组件 + 轻量接线”为主，避免大规模重构。
- 若需要新建组件，优先放到：
  - `src/components/chat/`
  - `src/components/graph/`
  - `src/components/world/`
  - `src/components/layout/`

【交付要求】
- 输出修改清单（文件路径 + 改动目的）。
- 输出关键交互流程（用户输入 -> narrative -> world/graph 更新 -> 面板刷新）。
- 输出可运行代码，不留伪代码。
- 遇到不确定字段时，以 `src/types/*` 为准。

---

## ⑤ 分任务子提示词（可分别投喂 Gemini）

### A. 页面任务（首页叙事工作台）
请基于 `src/app/world/page.tsx` 与 `src/components/layout/AppShell.tsx`，将工作台升级为更明确的四块体验：
- 左：对话 + 选项
- 中：分支树
- 右上：世界状态
- 右下：节点详情（选中节点信息）
要求：
- 不改变 store 分层。
- 可以通过在右侧区域使用 `flex` 垂直分块实现。
- 保持响应式与滚动行为可用。

### B. 组件任务（对话区 + 选项区）
请改造 `src/components/chat/ChatPanel.tsx`：
- 在保留 `MessageList` 与 `InputBox` 的基础上，新增“当前节点 choices 快捷选项区”。
- 点击选项时，将选项文本作为 `userInput` 提交 `requestNarrative`。
- loading 时禁用选项按钮。
- 不把生成逻辑下沉到按钮组件内部，逻辑仍由 ChatPanel 统一调度。

### C. 组件任务（分支树 + 节点信息面板）
请在图谱区域新增“节点详情面板”组件：
- 数据来源：`useGraphStore.selectedNodeId` + `useNarrativeStore.nodes`。
- 显示：node id、title、arc、narration 摘要、choices 数量、是否当前节点。
- `BranchGraph` 中点击节点后继续调用 `setSelectedNodeId`，面板自动刷新。
- 不修改 graphBuilder 的职责，不在 graphBuilder 拼装业务展示文案。

### D. 状态接线任务（只做接线，不破坏职责）
请检查并完善以下接线：
- narrative 提交成功后：
  - narrative nodes/messages 更新
  - world state 应用 state_update
  - graph 根据 narrative 重建
- selectedNodeId 变化后：
  - 节点详情面板正确显示
  - 世界状态面板不被错误重置

如需加 selector，请加在组件层，不要把 UI 派生字段写回 store 真相。

### E. 样式任务（极简纯色现代化）
请统一以下视觉规范：
- 背景：浅灰（如 #f6f6f7）
- 卡片：白底 + 1px 低对比边框
- 文字层级：标题 > 次标题 > 辅助文案
- 控件：圆角 10~14px，黑白灰主色
- 状态色：仅用于 warning/error，避免彩虹配色
- 保持 Tailwind 原子类风格，避免引入额外 UI 框架

### F. 交互任务（体验细节）
请补齐：
- 发送中状态：输入框与选项按钮禁用、按钮文案变化
- 空状态：无节点选中时显示引导文案
- 长内容处理：消息区、节点详情区、世界状态区都可滚动
- 可访问性：按钮有 `disabled` 视觉反馈，交互目标尺寸合理

---

## ⑥ 风险点与禁止事项

### 高风险点
- 在 UI 组件中直接修改多个 store，导致状态耦合。
- 将 world/graph 派生信息反向写入 narrative store，污染真相。
- 绕过 `/api/narrative` 在前端硬编码叙事推进。
- 在 graphBuilder 里塞入 UI 展示逻辑，导致映射层职责膨胀。

### 明确禁止
- 禁止重写 `src/app/api/narrative/route.ts` 的后端编排逻辑（前端任务不应改）。
- 禁止随意合并四个 store。
- 禁止把“节点详情面板”的展示字段持久化为新的全局真相。
- 禁止引入与现有架构冲突的状态管理库。
- 禁止大改类型定义并破坏 `src/types/narrative.ts` / `src/types/world.ts` 兼容。

---

## 建议的最小可行改动文件清单

### 建议修改
- `src/components/chat/ChatPanel.tsx`
- `src/components/chat/MessageList.tsx`（仅样式或小交互）
- `src/components/chat/InputBox.tsx`（禁用态/提示优化）
- `src/components/graph/BranchGraph.tsx`（仅交互和展示增强）
- `src/components/world/WorldStatePanel.tsx`（展示层增强）
- `src/components/layout/AppShell.tsx`（布局细调）
- `src/app/world/page.tsx`（组合新面板）

### 可新增
- `src/components/graph/SelectedNodePanel.tsx`
- `src/components/chat/ChoiceList.tsx`

### 默认不要动
- `src/app/api/narrative/route.ts`
- `src/lib/ai/*`
- `src/lib/graph/graphBuilder.ts`（除非仅为映射字段必要扩展）
- `src/stores/*`（除非最小必要接线）

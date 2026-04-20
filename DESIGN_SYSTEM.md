LING 设计系统 - 浅色主题配置指南
================================

## 颜色系统

### 核心颜色值

#### 主色调
- **主色（Primary）**: #007aff - 交互元素和强调
- **主色悬停**: #0052cc - 主色深色变体
- **主色淡色**: rgba(0, 122, 255, 0.1) - 背景用淡色

#### 背景色层级
- **Background**: #ffffff - 最浅层，页面背景
- **Elevated**: #f9f9fb - 浮起层，TopBar等
- **Card**: #f5f5f7 - 卡片层，组件内容背景
- **Panel**: #ffffff - 面板层，与Background相同

#### 文字色（前景色）
- **Foreground**: #1d1d1f - 主要文字（高对比）
- **Secondary**: rgba(29, 29, 31, 0.75) - 次要文字
- **Tertiary**: rgba(29, 29, 31, 0.5) - 辅助文字和占位符
- **Muted**: rgba(29, 29, 31, 0.3) - 禁用/弱化文字

#### 边框
- **Border**: rgba(0, 0, 0, 0.08) - 默认边框
- **Border Strong**: rgba(0, 0, 0, 0.15) - 强化边框（悬停时）

#### 状态色
- **Success**: #30d158 - 成功/正常状态
- **Warning**: #ff9f0a - 警告状态
- **Error**: #ff453a - 错误状态

---

## 使用场景

### Button 按钮

#### Primary（主按钮）
```tsx
<Button variant="primary">发送</Button>
```
- 背景：#007aff（主色）
- 文字：白色
- 悬停：#0052cc

#### Secondary（次按钮）
```tsx
<Button variant="secondary">取消</Button>
```
- 背景：#f5f5f7（Card色）
- 边框：rgba(0, 0, 0, 0.08)
- 文字：#1d1d1f（Foreground）

#### Ghost（幽灵按钮）
```tsx
<Button variant="ghost">更多</Button>
```
- 背景：透明
- 文字：rgba(29, 29, 31, 0.75)（Secondary）

---

### Input 输入框

- **背景**：#f5f5f7（Card色）
- **边框**：rgba(0, 0, 0, 0.08)
- **文字**：#1d1d1f（Foreground）
- **占位符**：rgba(29, 29, 31, 0.5)（Tertiary）
- **焦点边框**：#007aff（Primary）

---

### Card 卡片

#### Default
- **背景**：#f5f5f7（Card色）
- **边框**：rgba(0, 0, 0, 0.08)

#### Elevated
- **背景**：#f9f9fb（Elevated色）
- **边框**：rgba(0, 0, 0, 0.08)
- **阴影**：shadow-md shadow-black/5

#### Outlined
- **背景**：透明
- **边框**：rgba(0, 0, 0, 0.15)（Border Strong）

---

### Panel 面板

- **背景**：#ffffff（白色）
- **边框**：rgba(0, 0, 0, 0.08)
- **标题**：rgba(29, 29, 31, 0.75)（Secondary）
- **分隔线**：rgba(0, 0, 0, 0.08)

---

## 设计特点

### 对比度
浅色主题通过精心设计的色阶，确保：
- 文字与背景对比度 ≥ 7:1（WCAG AAA）
- 边框与背景对比度清晰但不突兀
- 所有交互元素都易于识别

### 极简主义
- 只用5种主要背景色，从明到暗
- 边框使用低饱和度黑色
- 强调空白和清晰的层级

### 沉浸式阅读
- 柔和的色彩过渡，减少视觉疲劳
- 足够的间距和排版优化
- 消息气泡采用主色强调重要内容

### 动效
所有动效采用柔和过渡：
- **Fade In**: 300ms 淡入
- **Slide Up**: 300ms 上滑 + 淡入
- **Hover**: 200ms 平滑颜色过渡

---

## Tailwind 集成

所有颜色都通过 Tailwind 类名使用：

```css
bg-background     /* 白色背景 */
bg-elevated       /* 浮起背景 */
bg-card           /* 卡片背景 */
bg-panel          /* 面板背景 */

text-foreground   /* 主要文字 */
text-secondary    /* 次要文字 */
text-tertiary     /* 辅助文字 */
text-muted        /* 禁用文字 */

border-border         /* 默认边框 */
border-border-strong  /* 强化边框 */

bg-primary        /* 主色 */
bg-success        /* 成功色 */
bg-warning        /* 警告色 */
bg-error          /* 错误色 */
```

---

## 快速开始

访问 `/design-system` 查看完整的设计系统展示和交互演示。

所有组件都位于 `/src/components/ui/`：
- `Button.tsx` - 按钮组件
- `Input.tsx` - 输入框组件
- `Card.tsx` - 卡片组件
- `Panel.tsx` - 面板组件

"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/Card";
import { Panel, PanelSection, PanelEmpty } from "@/components/ui/Panel";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* 标题 */}
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            LING 设计系统
          </h1>
          <p className="text-secondary">
            书籍分支叙事体验 - 统一UI组件库
          </p>
        </header>

        {/* 颜色系统 */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">颜色系统</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <ColorSwatch name="Primary" className="bg-primary" />
            <ColorSwatch name="Background" className="bg-background border border-border" />
            <ColorSwatch name="Elevated" className="bg-elevated" />
            <ColorSwatch name="Card" className="bg-card" />
            <ColorSwatch name="Panel" className="bg-panel" />
            <ColorSwatch name="Success" className="bg-success" />
            <ColorSwatch name="Warning" className="bg-warning" />
            <ColorSwatch name="Error" className="bg-error" />
          </div>
        </section>

        {/* 文字层级 */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">文字层级</h2>
          <div className="space-y-3 rounded-xl bg-card p-6">
            <p className="text-foreground">主要文字 (foreground)</p>
            <p className="text-secondary">次要文字 (secondary)</p>
            <p className="text-tertiary">辅助文字 (tertiary)</p>
            <p className="text-muted">禁用文字 (muted)</p>
          </div>
        </section>

        {/* 按钮组件 */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">Button 按钮</h2>
          <div className="space-y-6 rounded-xl bg-card p-6">
            {/* 变体 */}
            <div className="space-y-2">
              <p className="text-xs text-tertiary">变体 Variants</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            {/* 尺寸 */}
            <div className="space-y-2">
              <p className="text-xs text-tertiary">尺寸 Sizes</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* 状态 */}
            <div className="space-y-2">
              <p className="text-xs text-tertiary">状态 States</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button>正常</Button>
                <Button disabled>禁用</Button>
                <Button loading>加载中</Button>
              </div>
            </div>
          </div>
        </section>

        {/* 输入框组件 */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">Input 输入框</h2>
          <div className="grid gap-6 rounded-xl bg-card p-6 sm:grid-cols-2">
            <Input placeholder="基础输入框" />
            <Input label="带标签" placeholder="请输入内容" />
            <Input label="带提示" placeholder="请输入" hint="这是一条提示信息" />
            <Input label="错误状态" placeholder="请输入" error="输入内容有误" />
            <Input placeholder="禁用状态" disabled />
          </div>
        </section>

        {/* Card 组件 */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">Card 卡片</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card variant="default">
              <CardHeader title="默认卡片" description="variant: default" />
              <CardContent>
                <p className="text-sm text-secondary">卡片内容区域</p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader title="悬浮卡片" description="variant: elevated" />
              <CardContent>
                <p className="text-sm text-secondary">带阴影效果</p>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardHeader
                title="边框卡片"
                description="variant: outlined"
                action={<Button size="sm" variant="ghost">操作</Button>}
              />
              <CardContent>
                <p className="text-sm text-secondary">透明背景</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="secondary">取消</Button>
                <Button size="sm">确认</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Panel 组件 */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">Panel 面板</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Panel
              title="世界状态"
              headerAction={<Button size="sm" variant="ghost">刷新</Button>}
              className="h-64"
            >
              <PanelSection divided>
                <p className="text-xs text-tertiary">时间线</p>
                <p className="mt-1 text-sm text-foreground">主线 - 第三章</p>
              </PanelSection>
              <PanelSection divided>
                <p className="text-xs text-tertiary">地点</p>
                <p className="mt-1 text-sm text-foreground">废弃图书馆</p>
              </PanelSection>
              <PanelSection>
                <p className="text-xs text-tertiary">紧张度</p>
                <p className="mt-1 text-sm text-foreground">75%</p>
              </PanelSection>
            </Panel>

            <Panel title="空状态示例" className="h-64">
              <PanelEmpty>暂无分支记录</PanelEmpty>
            </Panel>
          </div>
        </section>

        {/* 阅读体验 */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">阅读体验</h2>
          <Card padding="lg">
            <div className="prose-reading text-secondary">
              <p>
                你推开那扇沉重的木门，尘埃在昏暗的光线中飞舞。图书馆的气息扑面而来——古老的羊皮纸、陈旧的木头，还有一丝若有若无的霉味。书架高耸入云，仿佛要触及那看不见的穹顶。
              </p>
              <p className="mt-4">
                你注意到角落里有一道微弱的蓝光闪烁。那里，一本书正在轻轻发光。
              </p>
            </div>
          </Card>
        </section>

        {/* 动效演示 */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">动效系统</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="animate-fade-in">
              <p className="text-sm text-secondary">淡入动画 (fade-in)</p>
            </Card>
            <Card className="animate-slide-up">
              <p className="text-sm text-secondary">上滑动画 (slide-up)</p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

/* 颜色色块组件 */
function ColorSwatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="space-y-2">
      <div className={`h-16 rounded-lg ${className}`} />
      <p className="text-xs text-tertiary">{name}</p>
    </div>
  );
}

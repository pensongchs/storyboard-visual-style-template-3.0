# 结构、容器与动作选择

先判断台词表达什么关系，再选画面结构；容器和入场动作最后确定。以下组件是可以直接改文案、数据、素材和时间轴的起点，不是每期都要轮播的固定八镜。

## 可直接复用的八种结构

入口：`assets/remotion-template/src/SemanticLayouts.tsx`。各结构默认放在 1280×720 的安全区域；底部和右侧继续留给字幕与平台按钮。`LayoutShowcase.tsx` 提供完整用法，`Root.tsx` 注册了对应 Composition。

| 台词关系 | 组件 / Composition | 轮廓与构图 | 内部动作 |
|---|---|---|---|
| A/B 各有利弊、两类对象 | `SplitCompare` / `Layout-Compare` | 左侧栏 + 右括号，共用对照轴 | 两边分别揭示，轴线在比较时建立 |
| 先后顺序、检查步骤 | `StepRoute` / `Layout-Route` | 2—3 个圆形节点 + 水平路径 | 源节点稳定，线到达，目标节点出现 |
| 多项费用、预算构成 | `BudgetStack` / `Layout-Budget` | 无外框账单条带 + 侧边累计数字 | 按实际金额展开，逐笔累加 |
| 一个关键数值及范围 | `MetricScale` / `Layout-Metric` | 大数字 + 横向刻度，无卡片外框 | 数字和指针一起抵达目标 |
| 指认实景中的证据位置 | `EvidenceFocus` / `Layout-Evidence` | 实景四角框 + 引线 + 括号注释 | 先定位，再连线，最后出现说明 |
| 包含关系、空间与面积口径 | `AreaLayers` / `Layout-Area` | 嵌套区域 + 当前层解释 | 逐层向内展开，当前层强调 |
| 如果、能否、两种结果 | `DecisionBranch` / `Layout-Decision` | 一个问题 + 两条分支，开放边界 | 问题先出现，沿分支揭示结果 |
| 纠正误区、得出取舍 | `VerdictMark` / `Layout-Verdict` | 原文批注 + 无框结论 + 结论章 | 划掉原判断，揭示新判断，标记落定 |

已有的 `SemanticMotion.tsx` 仍可直接使用：`FocusSelector` 适合逐项核对，`CostLayers` 适合不带具体金额的费用解释，`NumberRelation` 适合两个相关数字，`RiskReveal` 适合原位转折。按台词选择，不强制改用新组件。

`BudgetStack` 只接收有来源的非负金额，条带宽度与该组实际金额成比例。`MetricScale` 要求 `0 ≤ value ≤ maximum`，刻度范围须有解释依据。示例里的 60/12/18 万和 35 分钟明确标为演示值，不能作为真实房源数据使用。嵌套区域只表示包含关系，不表示实际面积比例；要解释数值比例时另用真实数据绘图。证据框必须核对底图位置，不能只给普通背景画框就声称已经证明结论。

## 时间接口

- `TimedItem`：`{label, start, detail?}`。`start` 为当前场景内的整数帧；数组按讲述顺序递增。
- 每种结构都接受 `end?`，默认当前场景结束。正式制作建议显式绑定语义段结束帧；最后一镜保持正常亮度至末帧。
- `SplitCompare`：`left`、`right` 分别是一个 `TimedItem`。
- `StepRoute`、`AreaLayers`：`items` 为 2—3 项；`BudgetStack.items` 为 1—3 项，额外含 `amount`，可设 `unit`。
- `MetricScale`：`value`、`maximum`、`unit`、`label`、`start`。
- `EvidenceFocus`：`label`、`detail?`、`start`、`labelStart`；`rect?` 为相对 MG 区的 `{x,y,width,height}`，位于右侧安全区内。不同证据位置需调整构图或自定义结构。
- `DecisionBranch`：`question` 为一个 `TimedItem`，`branches` 为两个 `TimedItem`。
- `VerdictMark`：`before`、`after`、`start`、`verdictStart`、`markStart`。

数字变化、节点聚焦和路径推进是语义动作；外面再套一层淡入不算新增一种动作。外层负责入场时，内层设 `motion="none"`，避免重复缩放或位移。

```tsx
// 字幕的绝对时间先减去本场景起点，再映射到实际 fps。
const localFrame = (absoluteMs: number) =>
  Math.round((absoluteMs - sceneStartMs) * fps / 1000);

<StepRoute
  items={[
    {label: '先看楼栋', start: localFrame(buildingStartMs)},
    {label: '再排硬伤', start: localFrame(riskStartMs)},
    {label: '最后选户型', start: localFrame(layoutStartMs)},
  ]}
  end={localFrame(sceneEndMs)}
/>
```

演示的每镜 5 秒仅用于展示组件。真实台词不能平均切成 5 秒，也不能复制示例里的触发帧。台词太密时减少状态、缩短连线或拆镜，不压缩到文字来不及阅读。

## 九种文字容器

`StoryboardTemplateV2.tsx` 的 `InformationCard.variant` 支持：

| variant | 形态 | 更适合承载 |
|---|---|---|
| `dark` | 深色圆角玻璃 | 状态、风险说明 |
| `pearl` | 珍珠白圆角卡 | 主要信息 |
| `pill` | 胶囊 | 短标签、短结论 |
| `rail` | 左侧竖线、向实景渐隐 | 编辑批注、对照项 |
| `bracket` | 两侧开放括号 | 概念边界、现场注释 |
| `outline` | 小圆角透明线框 | 条件、问题 |
| `underline` | 无底板、下划线 | 一句话判断 |
| `paper` | 顶边标色纸签 | 证据摘要 |
| `tab` | 左直边、右圆角页签 | 当前阶段、栏目切换 |

容器换皮不等于结构变化。九种容器只用于需要容器的文字；路径、刻度、空间图、实景标注优先使用相应结构。例：对照镜头若更换为两张圆角卡、预算镜头也改成两张圆角卡，即使颜色不同，仍应检查是否失去了结构差异。

基础组件的 `motion` 支持 `rise`、`slide`、`reveal`、`focus`、`wipe-down`、`stamp`、`none`。`wipe-down` 用于纵向展开，`stamp` 用于短结论落定；保持小幅、一次性动作。容器演示 `StoryboardTemplate-Surfaces` 是样式目录，三张并排只用于比较容器，不能照搬成正式视频的固定三卡网格。

## 每期如何落地

在原有逐镜规划中补齐：**台词关系、主构图、组件、容器、内部状态、触发帧**。这些字段直接用于实现和检查，无需另外制作设计报告。

至少 4 个不同语义节点时，沿用至少 3 种合适结构与 3 种主要动作的检查标准。相邻镜头若都是“左上标题 + 下方同位置横卡”，先判断是否应改为对照轴、路径、侧边标注、大数字或无框收束。连续解释同一关系时可保留结构并推进内部状态，不为了数量随机换形状。

先检查静止轮廓与信息关系是否明显不同，再检查连续动作。最终联系表如果只能看出文字、颜色、背景变化，仍需调整结构。不要让样例里展示得最多的卡片成为后续生成的万能默认值。

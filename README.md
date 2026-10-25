# 分镜素材画面风格模板3.0

这是“极限小滕”3.0 教程配套的 Codex Skill。调用后自动按字幕语义匹配动效库，统一材质与节奏，同时使用适合台词的不同解释结构。画面采用“真实城市生活视频或写实图片 + 杂志式信息排版”：实景负责可信度，标题、卡片、数字、节点和关系线负责解释口播。

适用于房产口播插入画面、独立分镜视频和动态图文包装，不用于片头、开场、封面或真人出镜整片。

## 默认模板预览

### 八种可运行的解释结构

![对照、路径、预算、刻度、证据、分层、分支、批注](assets/previews/06_多结构动效_八类示例.jpg)

对照轴、路径接力、预算累加、大数字刻度、实景证据定位、空间分层、条件分支、结论批注都有独立构图与内部动作。默认 `npm run render` 直接运行这套 40 秒演示；正式制作按台词选用合适结构，不固定轮播八镜。

### 九种文字容器

![深色、珍珠白、胶囊、侧栏、括号、下划线、线框、纸签、页签](assets/previews/07_文字容器_九种形态.jpg)

文字可使用玻璃卡、开放侧栏、括号、线框、纸签、页签或无框下划线。容器与动作分别选择；换颜色、换卡片皮肤不等于换解释结构。选型与接口见 [结构、容器与动作选择](references/LAYOUT_RECIPES.md)。

### 随台词变化的语义动效

![选择聚焦、费用分层、数字关系、风险转折](assets/previews/05_语义动效_四类示例.jpg)

四类示例共用模板的材质、色彩和节奏，分别按时间轴推进不同关系；文字、数字、素材和示例时间仅用于组件演示。正式制作按当期台词重新匹配，不固定套用这四镜。

### 排版与语义卡片基线

![默认模板排版基线](assets/previews/01_默认模板_排版基线.png)

### 总结镜头与结论层级

![默认模板结论层级](assets/previews/02_默认模板_结论层级.png)

### 真实成片：最低价房三次代价

![最低价房真实成片联系表](assets/previews/03_默认模板_真实成片联系表_最低价房.png)

### 真实成片：面积与权属

![面积权属真实成片联系表](assets/previews/04_默认模板_真实成片联系表_面积权属.png)

## 风格核心

- 实景或写实图片占画面约 60%—75%，先让观众看懂场景，再读结论。
- 炭黑、深暖灰、低饱和棕灰为底，暖白为主文字；暖金只用于核心数字、关键词和关系线。
- 一屏只讲一个主要观点，原则上不超过 3 个主要元素。
- 先按台词关系选择构图，再选择文字容器和动作；允许无框数字、开放标注与批注式结论，不固定为同一种横向面板。
- 所有元素随口播时间码出现；未讲内容不提前出现，结尾不额外加空镜或淡出。
- 1280×720 基准下保留底部字幕安全区和右侧平台按钮安全区。

完整规范见 [references/STORYBOARD_DESIGN.md](references/STORYBOARD_DESIGN.md)。

## 仓库内容

- `SKILL.md`：Codex Skill 主入口。
- `references/STORYBOARD_DESIGN.md`：当前模板的完整规则。
- `references/LAYOUT_RECIPES.md`：结构选型、九种容器、组件接口与时间轴用法。
- `assets/remotion-template/src/SemanticLayouts.tsx`：八种可复用解释结构。
- `assets/remotion-template/src/LayoutShowcase.tsx`：八种结构与九种容器的可运行演示。
- `assets/remotion-template/src/StoryboardTemplateV2.tsx`：默认母组件与五段排版示例，信息卡支持九种容器，基础组件支持七种动作选项。
- `assets/remotion-template/src/SemanticMotion.tsx`：独立实现的选择聚焦、费用分层、数字关系、风险反转组件。
- `assets/remotion-template/src/SemanticMotionShowcase.tsx`：四种语义结构的可运行演示。
- `assets/remotion-template/`：可直接安装依赖并运行的 Remotion 示例工程。
- `assets/previews/`：默认模板基准图与真实成片联系表。
- `assets/motion-library/`：23 项动效素材库原始文件、截图和登记说明。

## 安装 Skill

本仓库只发布一个 Skill：**分镜素材画面风格模板3.0**。唯一标识及安装目录名均为 `storyboard-visual-style-template-3-0`。`assets/` 中的源码、示例和动效库是这个 Skill 的配套资源，不是需要另外安装的版本。

在 Codex 中发送：

```text
$skill-installer
只安装 https://github.com/pensongchs/storyboard-visual-style-template-3.0 的 main 分支根目录 Skill。
安装名称固定为 storyboard-visual-style-template-3-0，只保留一个安装目录、一个 Skill 入口；不要安装作者的其他版本，也不要把示例工程注册成 Skill。
如果已安装同一来源的 3.0，请更新现有目录，不另建副本；先核对当前用户与项目的 Skill 位置，避免重复安装。
```

使用 `skill-installer` 的 `install-skill-from-github.py` 时，参数明确为 `--repo pensongchs/storyboard-visual-style-template-3.0 --ref main --path . --name storyboard-visual-style-template-3-0`。根目录路径 `.` 必须同时指定 `--name`，不要从仓库名、下载目录或源码文件名推导另一个 Skill 名称。

安装后选择 `storyboard-visual-style-template-3-0`；没有显示时重启 Codex。更新已有安装时复用原目录，并保留用户自行修改的内容。发现同来源的多份安装时，先确认哪个目录在使用，再停用多余入口；不要删除其他 Skill。GitHub 更新不会自动替换已下载的旧文件。

## 调用并提供本期输入

```text
$storyboard-visual-style-template-3-0
请用我提供的最终文案、SRT 和 Caption JSON 制作分镜素材。
制作范围：整份字幕（或填具体起止时间）。
本地视频：未提供，按 Skill 默认素材模式。
输出：独立 MP4。
```

拖入本期文件，或写清本机实际路径即可。没有时间码时提供音频；只有文案时先做规划。需要带配音的整条视频时明确说明。色彩、字号、构图、动效匹配和成片检查均由 Skill 负责，不需要复制长篇风格指令；特殊要求只说明本期确实不同的部分。短调用不代表单一动画，完整规则在 `SKILL.md` 与对应参考文件中。

## 制作与直接交付

默认由 Codex 在当前项目中制作、后台渲染并完成必要的成片检查，然后直接在对话中展示本地视频、文件链接和简要验证结果。无内嵌播放能力时提供文件链接。只有用户明确要求时才打开 Remotion Studio、外部浏览器或审片台。

## 运行 Remotion 示例

优先复用当前项目已有工程。首次使用独立示例时，让 Codex 从已安装 Skill 的实际目录复制 `assets/remotion-template/` 到当前项目的 `outputs/分镜制作/`；已存在同一工程时直接复用。安装目录只用于读取，不在其中写成片或安装依赖。

仓库不携带本机依赖与字体。由目标环境中的 Codex 读取工作工程的 `DEPENDENCIES.md`，按项目依赖管理规则准备依赖；普通独立工程可执行：

```bash
npm install
npx remotion browser ensure
npm run compositions
npm run still
npm run render
```

默认八种结构演示保存在 `renders/storyboard-template-showcase.mp4`（40 秒）；执行 `npm run render:surfaces` 输出 `renders/card-surfaces-showcase.mp4`（15 秒）。四种局部语义动效仍可执行 `npm run render:semantic`；五段排版示例保留 Composition `StoryboardTemplate-Showcase`。所有演示均无配音，共用仓库样图；预算与通勤数字在画面中标明为演示值，不能作为真实数据使用。正式制作须替换台词、素材、来源和字幕时间轴。`npm run studio` 仅用于用户明确要求的交互预览，不是渲染前置步骤。

如果 Chromium 被 Codex 沙箱明确阻止，Codex 应通过执行工具申请仅对所需命令授权，在原工作目录重跑并继续完成交付。浏览器下载、目录写入和启动权限应分别诊断；`browser ensure` 不负责解除沙箱限制。具体处理见 [依赖与运行权限说明](assets/remotion-template/DEPENDENCIES.md)。

## 授权提醒

仓库内第三方动效的许可证尚未逐项核实。公开仓库不代表这些素材自动获得开源或商用授权；正式发布、商用或二次分发前，请阅读 [NOTICE.md](NOTICE.md) 并确认来源许可。

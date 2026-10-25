# Remotion 分镜模板

该工程演示“城市居住观察｜纪实编辑感”分镜风格，默认输出八种构图与内部动作。正式制作按台词关系选择，保留统一字体、色彩、安全区与克制节奏。

- `src/StoryboardTemplateV2.tsx`：排版常量、基础组件、九种文字容器与七种动作选项。
- `src/SemanticLayouts.tsx`：对照、路径、预算、刻度、证据、分层、分支、批注八种解释结构。
- `src/LayoutShowcase.tsx`：八种结构演示、九种文字容器演示。
- `src/SemanticMotion.tsx`：选择聚焦、费用分层、双数字关系和风险反转。
- 组件选型与接口：[LAYOUT_RECIPES.md](../../references/LAYOUT_RECIPES.md)。

优先复用当前项目已有工程；需要示例时，将本目录复制到当前项目约定的可写目录，无约定时使用 `outputs/分镜制作/`。已存在同一工程时直接复用。Skill 安装目录只用于读取模板。

仓库不附带本机依赖与字体。由目标环境中的 Codex 读取 [DEPENDENCIES.md](DEPENDENCIES.md)，按项目依赖规则准备依赖；普通独立工程可执行：

```bash
npm install
npx remotion browser ensure
npm run typecheck
npm run compositions
npm run still
npm run render
npm run render:surfaces
```

默认结构演示：`renders/storyboard-template-showcase.mp4`，40 秒。容器演示：`renders/card-surfaces-showcase.mp4`，15 秒。检查图：`renders/storyboard-template-still.png`。默认由 Codex 后台完成渲染、检查并在对话中直接交付。`npm run studio` 仅用于用户明确要求的交互预览；不作为渲染前置步骤。明确的沙箱权限错误按依赖说明申请所需命令授权后重跑。

示例共用 `public/sample-assets/` 的五张图片，所有时间点仅用于展示组件；视频没有配音。预算与通勤数字明确标为演示值，空间嵌套不代表实际面积比例。正式制作必须替换当期素材、文案、数据来源与字幕帧，不照抄每镜 5 秒的节拍。

可运行的 Composition：

- `StoryboardTemplate-Layouts`：八种结构合集，默认 render。
- `Layout-Compare`、`Layout-Route`、`Layout-Budget`、`Layout-Metric`。
- `Layout-Evidence`、`Layout-Area`、`Layout-Decision`、`Layout-Verdict`。
- `StoryboardTemplate-Surfaces`、`Surface-1` 至 `Surface-3`：九种容器目录。
- `StoryboardTemplate-SemanticMotion`、`Semantic-Selection`、`Semantic-Cost`、`Semantic-Number`、`Semantic-Risk`。
- `StoryboardTemplate-Showcase`、`StoryboardTemplate-01` 至 `StoryboardTemplate-05`：五段排版示例。

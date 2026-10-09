# Remotion 默认母模板

该工程演示“城市居住观察｜纪实编辑感”默认分镜模板。核心源码是 `src/StoryboardTemplateV2.tsx`，包含公共排版常量、基础组件和五段排版示例 Composition。`src/SemanticMotion.tsx` 是四种可复用的语义动效，`src/SemanticMotionShowcase.tsx` 演示逐项聚焦、费用分层、双数字关系和风险反转。

示例图片位于 `public/sample-assets/`，只用于验证模板可以运行。正式制作必须替换为与当期台词一致、来源清楚且可用的高清素材。

优先复用当前项目已有工程；需要本示例时，将本目录复制到当前项目约定的可写工作目录，无约定时使用 `outputs/分镜制作/`。已存在同一工作工程时直接复用。Skill 安装目录只用于读取模板。

仓库不附带本机依赖与字体。由目标环境中的 Codex 读取 [DEPENDENCIES.md](DEPENDENCIES.md)，按项目依赖规则准备依赖。在普通独立工作工程中执行：

```bash
npm install
npx remotion browser ensure
npm run compositions
npm run still
npm run render
```

完整示例输出到 `renders/storyboard-template-showcase.mp4`，检查图输出到 `renders/storyboard-template-still.png`。默认由 Codex 后台运行、检查成片并在对话中直接交付视频与绝对路径文件链接。

渲染不需要先打开 Studio；`npm run studio` 只用于用户明确要求的交互预览。默认不打开外部浏览器或审片台。遇到明确的沙箱权限错误，由 Codex 按 [DEPENDENCIES.md](DEPENDENCIES.md) 申请所需命令授权并重跑。

可识别的 Composition：

- `StoryboardTemplate-SemanticMotion`（`npm run render:semantic` 输出四段语义动效）
- `Semantic-Selection`、`Semantic-Cost`、`Semantic-Number`、`Semantic-Risk`
- `StoryboardTemplate-Showcase`
- `StoryboardTemplate-01` 至 `StoryboardTemplate-05`

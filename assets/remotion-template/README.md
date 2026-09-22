# Remotion 默认母模板

该工程演示“城市居住观察｜纪实编辑感”默认分镜模板。核心源码是 `src/StoryboardTemplateV2.tsx`，包含公共排版常量、基础组件和五段示例 Composition。

示例图片位于 `public/sample-assets/`，只用于验证模板可以运行。正式制作必须替换为与当期台词一致、来源清楚且可用的高清素材。

仓库不附带本地依赖与字体文件。先让目标环境中的 Codex 读取 [DEPENDENCIES.md](DEPENDENCIES.md)，再执行：

```bash
npm install
npm run compositions
npm run studio
```

渲染完整示例：

```bash
npm run render
```

渲染单张检查图：

```bash
npm run still
```

可识别的 Composition：

- `StoryboardTemplate-Showcase`
- `StoryboardTemplate-01` 至 `StoryboardTemplate-05`

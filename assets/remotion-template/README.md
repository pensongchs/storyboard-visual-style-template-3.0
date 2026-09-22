# Remotion 示例工程

该工程演示分镜素材画面风格模板3.0的三个场景引擎。示例图片位于 `public/storyboard-template-v3-assets/`，正式制作时应替换为与台词一致且已获授权的高清素材。

依赖不会随 Skill 打包。先让目标环境中的 Codex 读取 [DEPENDENCIES.md](DEPENDENCIES.md)，检查环境并执行 `npm install`。

```bash
npm run studio
```

也可以分别执行：

```bash
npm run render:focus
npm run render:rail
npm run render:split
```

工程不附带本地字体文件。若项目需要固定字体，请让目标环境中的 Codex 获取已授权字体，放入项目素材目录并在组件中通过 `staticFile()` 与 `@font-face` 注册。

# 依赖清单

仓库不包含本机依赖文件。使用方的 Codex 应在目标环境中检查并安装以下依赖。

## 必需环境

- Node.js：建议 20 LTS 或更高版本。
- npm：随 Node.js 安装。
- Chromium：Remotion 首次运行时按官方流程获取或使用可用浏览器。

## npm 包

版本以 `package.json` 为准：

- `remotion` 4.0.484
- `@remotion/cli` 4.0.484
- `react` 19.2.7
- `react-dom` 19.2.7
- `typescript` 6.0.3
- `@types/react` 19.2.17
- `@types/react-dom` 19.2.3

安装命令：

```bash
npm install
```

不要从其他机器复制 `node_modules`；由目标环境重新解析并安装。

## 字体

模板不分发本地字体文件。默认回退为：

```text
PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif
```

需要更接近预览图时，可由目标环境中的 Codex 在确认授权后自行安装并配置：

- 阿里巴巴普惠体：用于主标题和短结论。
- 钉钉进步体：用于标签和辅助说明。

## 可选工具

- FFmpeg / ffprobe：用于抽帧、制作联系表和检查成片规格。
- Git：用于克隆与版本管理。

安装完成后先运行：

```bash
npm run compositions
```

确认三个 Composition 均可识别，再启动 Studio 或渲染。

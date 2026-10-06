# 依赖清单

仓库不包含本机依赖文件。使用方的 Codex 应先复用当前项目的 Remotion 工程，或将本示例复制到当前项目可写目录，再检查并安装以下依赖。不要在 Skill 安装目录中安装依赖或渲染。

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

## 浏览器与渲染检查

依赖可用后，在工作工程目录中执行：

```bash
npx remotion browser ensure
npm run compositions
npm run still
```

`browser ensure` 只确认或下载渲染浏览器，不授予 Codex 权限，也不能证明浏览器能够启动。Composition 检查与静帧成功后，再执行 `npm run render`。复用其他工程时使用该工程对应的入口、Composition 和输出路径。

默认由 Codex 后台完成上述检查和渲染。导出视频不要求先运行 `npm run studio`，不自动打开 Studio、外部浏览器或审片台。

## 沙箱权限错误的处理

先根据报错定位受限操作，不把所有 Chromium 启动失败都归为沙箱问题：

- 下载浏览器被网络策略阻止：申请所需下载访问；已安装兼容浏览器时，可使用经过检查的 `--browser-executable` 绝对路径。
- 缓存、临时文件或输出路径不可写：优先使用当前工作工程可写路径；仍需访问受限路径时，申请对应权限。
- 浏览器启动或本地服务被明确的沙箱限制阻止，例如 macOS 的 `bootstrap_check_in ... MachPortRendezvousServer ... Permission denied (1100)`，或带有明确受限操作的 `spawn EPERM`、`listen EPERM`：通过 Codex 当前执行工具的审批机制，申请仅对所需检查或渲染命令在沙箱外执行。工具支持时使用 `sandbox_permissions: "require_escalated"`；这是工具参数，不是让用户输入的终端命令。

获准后在原工作目录重跑原命令，仍由 Codex 完成渲染和交付，不要求用户切换软件。只有当前环境不提供审批能力、审批被拒绝或授权后同一问题仍存在时，说明具体原因；无法继续时再提供准确的工作目录、完整系统终端命令及预期输出路径。授权重跑后仍失败，应重新诊断，不反复申请相同权限。

不要为解决沙箱拦截反复重装依赖、修改分镜画面、自动修改全局权限配置，或默认要求关闭全部沙箱。Chromium 的 `--no-sandbox` 与 Codex 的执行沙箱是两层机制，该参数不能解除 Codex 的限制；不要将其作为此问题的通用修复。

浏览器缺失、系统库缺失、版本不兼容或代码错误，按对应原因处理。

参考：[Remotion 浏览器准备](https://www.remotion.dev/docs/cli/browser/ensure)、[Codex 沙箱与审批](https://learn.chatgpt.com/docs/agent-approvals-security)。

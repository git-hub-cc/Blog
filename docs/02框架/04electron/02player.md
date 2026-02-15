好的，通过分析您提供的 `Electron` + `Vite` + `Vanilla JS` 项目文件，我为您提炼了一套完整的项目架构和准备清单。这套模板结构清晰、模块化，非常适合用于构建功能复杂的桌面应用程序。

---

## Ⅰ. 项目架构提炼 (Project Architecture)

这个项目的架构遵循了关注点分离（Separation of Concerns）的原则，将一个复杂的应用拆解为三个主要部分：**主进程 (Backend)**、**渲染进程 (Frontend)** 和作为桥梁的 **预加载脚本 (Preload)**。

### 1. 主进程 (Main Process / Backend)

主进程是应用的“大脑”和“骨架”，负责所有与操作系统交互的底层任务。它不处理UI，而是为UI提供数据和服务。

-   **职责**:
    -   创建和管理应用窗口 (`BrowserWindow`)。
    -   处理应用的生命周期事件 (启动、关闭等)。
    -   注册全局快捷键、菜单和协议。
    -   通过 `ipcMain` 监听并响应渲染进程的请求。
    -   执行文件系统操作 (读写、删除文件)。
    -   调用原生Node.js模块或第三方库 (如 `axios`, `yt-dlp-wrap-plus`)。
    -   管理外部二进制工具 (如 FFmpeg)。

-   **架构分层**:
    1.  **入口与协调层 (`main-api.js`)**:
        -   应用的起点。
        -   负责初始化应用、创建窗口、注册所有IPC句柄。
        -   协调各个服务模块的初始化和依赖注入。
    2.  **启动与环境设置层 (`services/setup-service.js`)**:
        -   在应用启动时运行，负责准备好所有环境依赖。
        -   创建必要的应用数据目录 (`media`, `videos`, `bin`等)。
        -   检查、下载和管理核心二进制工具 (FFmpeg, yt-dlp)，并提供其路径。
        -   检测系统环境 (如代理)。
    3.  **业务逻辑层 (`services/*.js`)**:
        -   封装应用的核心功能，每个服务对应一个主要业务领域。
        -   **`library-service.js`**: 管理本地媒体库，包括读取播放列表、导入文件、删除文件、分离音视频等。
        -   **`download-service.js`**: 处理所有下载任务，根据URL类型分发给不同的`Provider`。
        -   **`online-service.js`**: 负责处理在线音乐的搜索、获取URL、缓存等逻辑。
    4.  **数据提供层 (`providers/*.js`)**:
        -   封装与特定第三方API或网站的交互逻辑。
        -   将外部数据源的请求和响应格式进行标准化，供上层`Service`调用。
        -   **`gdstudio.js`**: 封装对 `music-api.gdstudio.xyz` 的所有API调用。
        -   **`youtube.js`**, **`jable.js`**, **`douyin.js`**: 分别封装对特定视频网站的解析和下载逻辑。

### 2. 渲染进程 (Renderer Process / Frontend)

渲染进程就是用户能看到和交互的界面，本质上是一个在Chromium环境中运行的网页。

-   **职责**:
    -   渲染HTML、应用CSS样式。
    -   处理用户交互事件 (点击、拖拽、键盘输入)。
    -   通过预加载脚本暴露的 `electronAPI` 向主进程发送请求。
    -   监听主进程推送的事件并更新UI。
    -   管理前端应用的状态。

-   **架构分层**:
    1.  **视图层 (`index.html` + `css/`)**:
        -   `index.html`: 应用的唯一HTML骨架，包含所有UI元素的容器和用于克隆的`<template>`。
        -   `css/`: 模块化的CSS文件，按功能或组件划分 (如 `layout.css`, `panels.css`, `player-controls.css`)，便于维护。
    2.  **逻辑协调层 (`renderer.js`)**:
        -   前端的入口和总指挥。
        -   负责初始化所有模块、加载初始数据、设置所有顶层事件监听器。
        -   处理从主进程接收到的数据，并调用其他模块更新UI。
    3.  **核心功能模块 (`js/*.js`)**:
        -   **`dom.js`**: 集中管理所有DOM元素的选择，作为唯一的DOM引用源，避免在代码中散布`document.querySelector`。
        -   **`state.js`**: 集中管理前端的所有状态（播放列表、当前索引、播放状态等），提供修改状态的函数，是应用的“单一数据源”。
        -   **`player.js`**: 封装所有与媒体播放相关的核心逻辑（加载、播放、暂停、切换、进度更新）。
        -   **`ui.js`**: 封装所有纯粹的UI操作函数（显示/隐藏面板、渲染列表、显示Toast提示、更新按钮状态等）。
    4.  **独立特性模块 (`js/features/*.js`)**:
        -   将复杂的、可独立的功能封装成模块。
        -   **`shortcuts.js`**: 处理快捷键的加载、设置和执行逻辑。
        -   **`gallery.js`**: 实现背景画廊的虚拟化滚动和交互。
        -   **`downloader.js`**: 处理下载面板的UI逻辑，包括搜索、分页和与主进程的交互。

### 3. 预加载脚本 (Preload Script)

`preload.js` 是连接主进程和渲染进程的安全桥梁。

-   **职责**:
    -   在拥有Node.js环境的沙盒中运行。
    -   使用 `contextBridge.exposeInMainWorld` 精心选择并暴露一个安全的API对象 (`electronAPI`) 给渲染进程。
    -   这是唯一允许的通信方式，确保了渲染进程无法直接访问Node.js或主进程的全部能力，增强了应用的安全性。
    -   **关键实践**: 将渲染进程传入的复杂对象 (如 `File` 对象) 转换为普通JS对象，并提取其物理路径 (`webUtils.getPathForFile`)，然后再传递给主进程。

---

## Ⅱ. 新建项目准备内容清单 (Preparation Checklist)

当您计划启动一个类似的新项目时，可以按照以下清单来准备：

### 1. 项目初始化与构建配置

-   **`package.json`**:
    -   **基本信息**: `name`, `productName` (应用显示名), `version`, `description`, `author`。
    -   **脚本 (`scripts`)**: 定义 `start` (开发), `make` (打包安装程序), `package` (打包), `lint` 等命令。
    -   **依赖 (`dependencies` & `devDependencies`)**: 规划并列出项目所需的核心依赖，例如：
        -   `electron-squirrel-startup` (Windows安装程序启动处理)。
        -   `axios` (HTTP请求)。
        -   `yt-dlp-wrap-plus` (YouTube及其他网站下载)。
        -   `@electron-forge/*` (核心构建和打包工具)。
        -   `@electron-forge/plugin-vite` (Vite集成插件)。
        -   `electron`, `vite`。

-   **`forge.config.js`**:
    -   **打包配置 (`packagerConfig`)**:
        -   `asar: true` (将应用代码打包成asar档案)。
        -   `icon`: 准备好应用图标 (`.ico` for Windows, `.icns` for macOS)。
        -   `extraResource`: 如果有需要随包分发的外部文件，在此处声明。
    -   **制作器 (`makers`)**:
        -   为目标平台配置安装包生成器 (如 `@electron-forge/maker-squirrel` for Windows)。
        -   准备 `setupIcon` (安装程序图标) 和 `iconUrl` (控制面板图标)。
    -   **插件 (`plugins`)**:
        -   配置 `@electron-forge/plugin-vite`，明确指定 `main`, `preload`, 和 `renderer` 的入口文件及各自的Vite配置文件。

-   **Vite 配置文件**:
    -   **`vite.main.config.mjs`**: 为主进程配置。**核心配置**: `ssr: { noExternal: true }`，强制将所有依赖打包进去，避免运行时找不到模块。
    -   **`vite.preload.config.mjs`**: 为预加载脚本配置，通常比较简单。
    -   **`vite.renderer.config.mjs`**: 为渲染进程配置。**核心配置**: `base: './'`，确保打包后HTML能正确引用CSS/JS，解决白屏问题。

### 2. 核心代码结构与文件

-   **目录结构**:
    ```
    .
    ├── src
    │   ├── backend     # 主进程代码 (Main Process)
    │   │   ├── providers/
    │   │   └── services/
    │   │   └── main-api.js
    │   ├── renderer    # 渲染进程代码 (Renderer Process)
    │   │   ├── assets/
    │   │   ├── css/
    │   │   └── js/
    │   │       └── features/
    │   │   └── index.html
    │   └── preload.js  # 预加载脚本
    ├── forge.config.js
    └── package.json
    ```

-   **文件模板**:
    -   `main-api.js`: 准备好应用生命周期、窗口创建和IPC注册的基本框架。
    -   `preload.js`: 准备好 `contextBridge.exposeInMainWorld` 的结构，并规划要暴露给前端的API。
    -   `renderer.js`: 准备好 `DOMContentLoaded` 事件监听器作为前端启动入口。
    -   `index.html`: 搭建好基础HTML结构，包括所有UI容器和`<template>`占位符。

### 3. 静态资源与资产

-   **应用图标**:
    -   一个 `app.ico` 文件 (至少256x256) 用于Windows程序和安装包。
    -   一个 `app.icns` 文件用于macOS。
    -   一个高分辨率的 `.png` 文件作为源文件。
-   **UI 资源**:
    -   默认封面图 (SVG或PNG)。
    -   所有按钮和图标的SVG代码或图片文件。
-   **CSS 框架**:
    -   `base.css`: 定义全局变量 (颜色、字体)、重置样式。
    -   为每个主要UI区域 (布局、控制条、面板等) 创建独立的CSS文件。

### 4. 功能模块规划

在编码前，先规划好核心功能，并将其映射到上述的架构中：

-   **主进程服务 (`services`)**:
    -   需要哪些核心服务？(例如：用户认证服务、数据同步服务、文件处理服务等)。
-   **数据提供者 (`providers`)**:
    -   应用需要对接哪些外部API？为每个API创建一个`provider`文件。
-   **渲染进程模块 (`js`)**:
    -   `state.js`: 思考并列出应用需要管理的全部前端状态。
    -   规划其他模块的职责，如 `api.js` (封装`electronAPI`调用), `ui.js`, `player.js` 等。

通过遵循这套架构和准备清单，您可以系统性地构建一个健壮、可维护且可扩展的Electron应用。
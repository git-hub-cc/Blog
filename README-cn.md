# 纯前端静态博客模板

这是一个轻量、优雅且功能完备的纯前端静态博客模板。它使用基础的 HTML、CSS 和 Vanilla JavaScript 构建，无需复杂的构建工具或后端服务。你只需要将文件上传到任何静态托管平台（如 GitHub Pages、Vercel、Netlify 或自己的服务器），即可拥有一个属于自己的博客。

该模板的设计灵感来源于 [Stack 主题](https://github.com/CaiJimmy/hugo-theme-stack)，并在此基础上进行了简化和定制。

[English Version](./README.md)

## ✨ 功能特性

*   **纯静态，零依赖**：无需 Node.js、无需数据库，无需编译，部署简单。
*   **响应式设计**：完美适配桌面、平板和移动设备。
*   **亮色/暗色主题**：支持手动切换，并能根据操作系统偏好自动选择，记忆用户选择。
*   **单页应用 (SPA)**：基于 URL Hash 实现路由，页面切换无需刷新，体验流畅。
*   **Markdown 支持**：文章使用 Markdown 编写，通过 `marked.js` 在客户端实时渲染。
*   **代码语法高亮**：使用 `highlight.js` 支持多种编程语言的语法高亮，并包含一键复制代码功能。
*   **客户端搜索**：内置文章标题和摘要的即时搜索功能。
*   **文章分类**：通过导航菜单轻松筛选不同分类下的文章。
*   **分页功能**：文章列表超过设定数量时自动进行分页。
*   **自定义页面**：支持创建如“关于我”之类的独立页面。
*   **个性化错误页**：提供精心设计的 `404` 和 `50x` 错误页面。

## 🚀 快速开始

使用这个模板来搭建你自己的博客非常简单。

### 1. 获取代码

将本项目克隆或下载到本地。

```bash
git clone https://github.com/git-hub-cc/blog
```

### 2. 自定义基本信息

打开 `index.html` 文件，根据你的需求修改以下内容：

*   **网站标题**: 修改 `<title>` 标签和 `.site-name` 里的内容。
*   **头像**: 替换 `.site-logo` 的 `src` 路径 (`blog/img/head/my.png`)。
*   **网站描述**: 修改 `.site-description` 里的文本。
*   **导航菜单**: 在 `.site-nav` 中添加或修改分类链接。`data-nav-id` 属性应与 `posts.json` 中的 `category` 值对应。
*   **社交链接**: 修改 `.social-links` 中的 `<a>` 标签，换成你自己的社交媒体主页。
*   **版权/备案信息**: 修改 `.copyright` 里的文本。

### 3. 发表新文章

发表新文章分为两步：

**第一步：创建 Markdown 文件**

在 `blog/md/` 目录下（或其子目录，如 `blog/md/programming/`）创建一个新的 `.md` 文件。你可以使用任何你喜欢的 Markdown 编辑器来写作。

**第二步：更新文章索引**

打开 `blog/posts.json` 文件，在数组的 **最前面** 添加一个 JSON 对象来描述你的新文章。该对象包含以下字段：

*   `file` (string): **必填**，相对于 `blog/md/` 目录的 Markdown 文件路径。
*   `title` (string): **必填**，文章标题。
*   `date` (string): **必填**，发布日期，格式建议为 `YYYY-MM-DD`。
*   `summary` (string): **必填**，文章摘要，会显示在文章列表页。
*   `category` (string): **必填**，文章分类。这个值需要与 `index.html` 中导航链接的 `data-nav-id` 属性值匹配，以便高亮当前分类。

例如，要添加一篇名为 `my-new-post.md` 的文章：

```json
[
  {
    "file": "life/my-new-post.md",
    "title": "我的新文章",
    "date": "2024-05-21",
    "summary": "这是我发布的第一篇关于生活的文章，记录一些有趣的事情。",
    "category": "life" 
  }
]
```
> **注意**: `posts.json` 是一个数组，新文章的对象应该添加到数组的开头，以确保文章列表按时间倒序排列。

### 4. 修改“关于”页面

直接编辑 `blog/md/about.md` 文件即可更新“关于”页面的内容。

### 5. 部署

将整个项目文件夹上传到任何支持静态文件的 Web 服务器或托管平台即可。

*   **GitHub Pages**: 将代码推送到你的 GitHub 仓库，并在仓库设置中开启 Pages 功能。
*   **Vercel/Netlify**: 直接关联你的 GitHub 仓库，平台会自动完成部署。
*   **云服务器**: 使用 Nginx 或 Apache 等 Web 服务器，将根目录指向项目文件夹。

## 📁 文件结构

下面是项目的主要文件结构和说明：

```
.
├── index.html              # 网站主入口和布局文件
├── 40x.html                # 自定义 404 错误页面
├── 50x.html                # 自定义 500 错误页面
├── README-cn.md            # 项目说明文件
└── blog/
    ├── css/
    │   └── style.css       # 全局样式表
    ├── js/
    │   └── app.js          # 核心 JavaScript 逻辑
    ├── lib/                # 第三方库
    │   ├── marked.min.js   # Markdown 解析库
    │   ├── highlight.min.js # 代码高亮库
    │   └── atom-one-dark.min.css # highlight.js 的主题样式
    ├── md/
    │   ├── about.md        # “关于”页面的源文件
    │   └── ...             # 存放你的文章 .md 文件
    ├── img/
    │   └── ...             # 存放图片资源
    └── posts.json          # 文章索引 "数据库"
```

## 🔧 依赖与致谢

本项目依赖以下优秀的开源库：

*   [marked.js](https://github.com/markedjs/marked): 一个功能强大、速度极快的 Markdown 解析器。
*   [highlight.js](https://github.com/highlightjs/highlight.js): 一个通用的代码语法高亮库。

UI 设计灵感来源于 [Hugo Stack Theme](https://github.com/CaiJimmy/hugo-theme-stack)。

---
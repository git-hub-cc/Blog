# Blog - 极简主义文档博客系统

**Write in Markdown, Publish in Style.**

这是一个基于 Vue 3 + Vite + Tailwind CSS 4 构建的极简文档博客系统。它专为喜欢用 Markdown 写作的人设计，提供类似 Typora 的阅读体验，并具备自动生成目录、全文搜索、双重高亮主题等现代功能。

## ✨ 核心特性

- 📄 **原生 Markdown 支持**：集成 `markdown-it` 全家桶，支持脚注、任务列表、锚点定位及容器说明（Callouts）。
- 📂 **自动化目录树**：无需手动配置侧边栏，系统会根据 `/docs` 目录结构自动生成多级导航。
- 🔍 **全文搜索**：基于本地索引的实时搜索，支持标题、描述及正文内容匹配。
- 🌓 **完美深色模式**：自动跟随系统主题，支持手动切换。代码高亮在亮色模式下使用 GitHub 风格，深色模式下自动切换为 One Dark 风格。
- 💻 **优雅的代码块**：支持一键复制、超长代码折叠、Mac 风格控制按钮及语言标签。
- 📱 **响应式设计**：针对移动端深度优化，拥有抽屉式侧边栏和悬浮式目录（TOC）。
- 🧭 **完善的导航**：内置面包屑、文章上下页切换、自动同步的侧边悬浮目录。
- 🔗 **中文路径友好**：完美支持中文文件夹和文件名，URL 编码自动处理。

---

## 🚀 快速上手

### 1. 克隆项目
```bash
git clone https://github.com/git-hub-cc/Blog.git
cd Blog
```

### 2. 安装依赖
```bash
npm install
```

### 3. 本地开发
```bash
npm run dev
```

### 4. 构建发布
```bash
npm run build
```

---

## 📁 项目结构

```text
Blog/
├── public/              # 静态资源 (Logo, 微信二维码等)
├── docs/                # Markdown 文档存放处 (按文件夹分类)
├── src/
│   ├── components/      # UI 组件 (搜索, 侧边栏, 目录等)
│   ├── css/             # 样式系统 (Tailwind 4, Markdown 样式)
│   ├── markdown/        # Markdown 渲染引擎逻辑
│   ├── views/           # 页面视图 (DocView)
│   ├── config.js        # 站点全局配置文件
│   └── main.js          # 入口文件
├── index.html
└── package.json
```

---

## ⚙️ 配置说明

你可以通过修改 `src/config.js` 快速自定义你的博客：

```javascript
export default {
    title: '我的博客',
    description: '写在 Markdown，发布在风格。',
    logo: '/logo.svg',       // 放置在 public 目录下

    theme: {
        primaryColor: '#197fe6',
        defaultMode: 'dark', // 默认模式
    },

    search: {
        enabled: true,
        placeholder: '搜索文档...',
    },

    socialLinks: [
        { icon: 'G', link: 'https://github.com/your-id' }, // 社交链接
    ]
}
```

---

## 📝 Markdown 进阶语法

### 1. Frontmatter
在文档顶部添加，用于定义元数据：
```markdown
---
title: 如何使用本系统
description: 这是一个简单的教程说明
date: 2024-03-20
tags: [教程, Vue3]
---
```

### 2. Callouts (提示块)
使用 Blockquote 语法触发：
```markdown
> [!NOTE]
> 这是一个普通提示。

> [!TIP]
> 这是一个成功/建议提示。

> [!WARNING]
> 这是一个警告信息。

> [!DANGER]
> 这是一个危险/错误警告。
```

---

## 🛠 后续计划 (Roadmap)

我们正致力于让 Blog 变得更智能、更易于分发：

1.  **标签系统 (Tags)**：支持在 Frontmatter 中定义 tags 并对内容进行分类归纳。
2.  **标签搜索**：在搜索界面增加标签过滤维度，快速定位相关主题。
3.  **AI 自动打标**：接入轻量化小模型（如 Ollama/WebLLM），根据正文内容自动推荐或生成推荐 tags。
4.  **NPM 发布**：将核心渲染引擎与 UI 封装，支持通过 `npm install` 快速集成到现有 Vite 项目中。

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源。

这是我的第一篇文章。这个博客是使用纯 HTML, CSS 和 JavaScript 构建的，它能动态地从 Markdown 文件加载内容。

## 它是如何工作的

- **内容**: 所有文章都以 `.md` 格式存放在 `/md/` 目录中。
- **索引**: 一个 `posts.json` 文件作为所有文章的清单。
- **渲染**: 使用 `marked.js` 库将 Markdown 实时转换为 HTML。

非常轻量，不是吗？
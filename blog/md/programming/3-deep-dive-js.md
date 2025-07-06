(你可以创建更多文章...)

#### `posts.json` (文章索引)
这是项目的关键。它是一个 JSON 数组，每个对象代表一篇文章。**请确保文章按日期倒序排列（最新的在最前面）**。

```json
[
  {
    "file": "3-deep-dive-js.md",
    "title": "深入 JavaScript 异步编程",
    "date": "2023-10-27",
    "summary": "从回调地狱到 Promise，再到 Async/Await，一文看懂 JavaScript 异步的演进之路。"
  },
  {
    "file": "2-markdown-syntax.md",
    "title": "Markdown 语法演示",
    "date": "2023-10-26",
    "summary": "展示了在这个博客中可以使用的各种 Markdown 语法，包括列表、代码块和引用。"
  },
  {
    "file": "1-getting-started.md",
    "title": "欢迎来到我的博客",
    "date": "2023-10-25",
    "summary": "我的第一篇文章！介绍了这个博客是如何用纯前端技术构建的。"
  }
]
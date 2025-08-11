好的，这是对 Google CSS 样式指南 (Google CSS Style Guide) 的一份完整且分类清晰的文档。

---

## Google CSS 样式指南 (分类详解)

### 引言与基本原则

Google 的 CSS 指南旨在提高代码质量、增强代码的一致性和可维护性。其核心原则是创建可预测、可重用、可扩展且易于维护的 CSS。无论项目大小、团队规模如何，遵循这些规则都能带来长期的好处。

### 1. 格式化与语法 (Formatting & Syntax)

这部分规定了 CSS 代码的书写外观，以保证团队成员写出风格一致的代码。

| 规则 | 说明 | 示例 |
| :--- | :--- | :--- |
| **缩进** | 使用 2 个空格进行缩进，不要使用 Tab 键。 | ```css<br>.example {<br>  color: #fff;<br>} <br>``` |
| **大小写** | 全部使用小写。包括选择器、属性和属性值（颜色代码等字符串除外）。 | **推荐:** `color: #e5e5e5;` <br> **不推荐:** `COLOR: #E5E5E5;` |
| **结尾分号** | 每个声明都必须以分号结尾。 | ```css<br>.example {<br>  color: #fff;<br>  background: #000;<br>} <br>``` |
| **声明块** | 左花括号 `{` 前有一个空格，右花括号 `}` 单独占一行。 | ```css<br>.selector {<br>  /* ... */<br>} <br>``` |
| **属性与值** | 属性名后的冒号 `:` 后有一个空格，冒号前没有空格。 | **推荐:** `font-size: 16px;` <br> **不推荐:** `font-size:16px;` |
| **选择器** | 多个选择器分组时，每个选择器单独占一行。 | ```css<br>h1,<br>h2,<br>h3 {<br>  font-weight: bold;<br>} <br>``` |
| **注释** | 推荐使用块注释（`/* ... */`）来解释代码的目的、上下文和实现思路。不要只解释“代码做了什么”，而要解释“为什么这么做”。 | ```css<br>/* 主导航栏样式 */<br>/* 用于覆盖第三方库的默认边距 */<br>.nav {<br>  margin: 0; /* 重置边距 */<br>} <br>``` |
| **TODO 注释** | 使用统一的 `TODO` 格式，方便工具查找和跟踪。 | ```css<br>/* TODO(username): 待图片资源就位后替换背景 */<br>.hero {<br>  background-color: #ccc;<br>} <br>``` |
| **文件编码** | 文件必须使用 UTF-8 编码。 | 在 CSS 文件顶部声明：`@charset "UTF-8";` |

---

### 2. 命名约定 (Naming Conventions)

命名是 CSS 中最关键的部分之一，直接影响代码的可读性和可维护性。

| 规则 | 说明 | 示例 |
| :--- | :--- | :--- |
| **类名 (Class)** | 1. **描述性与结构化**：类名应描述“它是什么”（What it is），而不是“它像什么”（What it looks like）或“它在哪里”（Where it is）。<br>2. **单词分隔**：使用连字符（`-`）分隔单词。<br>3. **避免过度简写**：`btn` 可以接受，但 `b` 则不行。清晰性优于简洁性。 | **推荐:** `.nav`, `.article-title`, `.video-player`<br>**不推荐:** `.pull-left`, `.red-text`, `.top-nav` |
| **ID 选择器** | 1. **谨慎使用**：ID 具有高特异性，难以复用和覆盖。因此，**严禁使用 ID 选择器进行样式设置**。<br>2. **唯一用途**：ID 应用于 JavaScript 钩子或页面内锚点（Fragment Identifiers）。 | ```html<br><!-- 用于 JS 操作 --><br><div id="user-profile-dialog">...</div><br><br><!-- 用于页面内跳转 --><br><h2 id="section-1">...</h2> <br>``` |
| **BEM (思想借鉴)** | 虽然 Google 指南没有强制要求 BEM，但其命名思想与 BEM 的“块”（Block）和“元素”（Element）概念非常契合。例如，`.article-title` 可以看作是 `article` 块下的 `title` 元素。 | **类 BEM 风格:**<br>`.video-player {}`<br>`.video-player-controls {}`<br>`.video-player-button {}` |

---

### 3. CSS 规则与声明 (CSS Rules & Declarations)

这部分规定了如何编写具体的 CSS 规则。

| 规则 | 说明 | 示例 |
| :--- | :--- | :--- |
| **声明顺序** | **核心规则**：相关的属性声明应该分组并按特定顺序排列，以提高可读性。<br>1. **定位 (Positioning)**: `position`, `top`, `right`, `z-index`, `display`, `float`...<br>2. **盒模型 (Box Model)**: `width`, `height`, `margin`, `padding`, `border`...<br>3. **排版 (Typographic)**: `font`, `line-height`, `text-align`, `color`...<br>4. **视觉 (Visual)**: `background`, `box-shadow`, `opacity`...<br>5. **其他 (Misc)**: `cursor`, `overflow`, `animation`... | ```css<br>.widget {<br>  /* 定位 */<br>  position: absolute;<br>  top: 0;<br>  left: 0;<br>  z-index: 100;<br><br>  /* 盒模型 */<br>  display: block;<br>  width: 100px;<br>  height: 100px;<br>  padding: 10px;<br>  border: 1px solid #ccc;<br><br>  /* 排版 */<br>  font-family: Arial, sans-serif;<br>  color: #333;<br><br>  /* 视觉 */<br>  background: #f5f5f5;<br>  opacity: 1;<br>} <br>``` |
| **简写属性** | **谨慎使用**。只有当你需要明确设置所有简写值时才使用。否则，请使用具体属性，以避免意外覆盖。<br>例如，使用 `margin-top` 而不是 `margin` 来只设置上边距。 | **推荐 (只设置上边距):**<br>`margin-top: 10px;`<br><br>**不推荐 (会重置其他三个方向):**<br>`margin: 10px 0 0 0;`<br><br>**推荐 (设置所有值):**<br>`background: #fff url(image.png) no-repeat;` |
| **0 值** | 当值为 0 时，不需要添加单位。 | **推荐:** `margin: 0; padding: 0;`<br>**不推荐:** `margin: 0px; padding: 0em;` |
| **带前缀的属性** | 如果使用浏览器前缀，建议将它们对齐，以提高可读性，并将标准属性放在最后。 | ```css<br>.example {<br>  -webkit-transition: all 0.5s;<br>     -moz-transition: all 0.5s;<br>       -o-transition: all 0.5s;<br>          transition: all 0.5s;<br>} <br>``` |
| **CSS Hacks** | 尽可能避免使用 CSS Hacks。如果必须使用，请添加详细注释，说明其针对的浏览器和原因。 | ```css<br>.example {<br>  *zoom: 1; /* IE6/7: 触发 hasLayout */<br>} <br>``` |

---

### 4. 选择器 (Selectors)

选择器的使用直接关系到 CSS 的性能、特异性和可维护性。

| 规则 | 说明 | 示例 |
| :--- | :--- | :--- |
| **保持低特异性** | 选择器应尽可能简单，特异性（Specificity）尽可能低。这使得样式更容易被覆盖，减少了 `!important` 的使用。 | **推荐 (低特异性):**<br>`.nav a { ... }`<br><br>**不推荐 (高特异性):**<br>`#header .nav ul li a { ... }` |
| **避免过度限定** | 不要用元素名来限定类选择器。这会降低组件的灵活性和复用性。 | **推荐 (可用于 `<ul>`, `<ol>`):**<br>`.nav { ... }`<br><br>**不推荐 (仅限 `<ul>`):**<br>`ul.nav { ... }` |
| **性能** | 避免使用复杂的后代选择器和通用选择器（`*`），尤其是在大型 DOM 树上。简单的类选择器性能最好。 | **推荐 (高性能):**<br>`.product-list { ... }`<br><br>**不推荐 (可能影响性能):**<br>`.container * .content > p { ... }` |

---

### 5. 预处理器 (Preprocessors - e.g., Sass)

如果使用 Sass 等预处理器，也需要遵循特定规则。

| 规则 | 说明 | 示例 (Sass) |
| :--- | :--- | :--- |
| **嵌套层级** | **最多嵌套 3 层**。深度嵌套会产生高特异性的选择器，难以维护，并且与 HTML 结构过度耦合。 | **推荐 (浅层嵌套):**<br>```scss<br>.card {<br>  .card-title { /* ... */ }<br>  .card-body { /* ... */ }<br>}<br>```<br>**不推荐 (深度嵌套):**<br>```scss<br>.page {<br>  .main {<br>    .content {<br>      .card { /* 嵌套过深 */ }<br>    }<br>  }<br>}<br>``` |
| **`@extend`** | **禁止使用 `@extend`**。它会产生难以预测和调试的 CSS 输出，并且会打乱源码顺序，破坏可维护性。应优先使用 mixin 或创建新的工具类。 | **推荐 (使用 mixin):**<br>```scss<br>@mixin border-radius($radius) {<br>  -webkit-border-radius: $radius;<br>          border-radius: $radius;<br>}<br>.box { @include border-radius(4px); }<br>``` |
| **变量** | 1. **命名**: 变量名使用连字符（`-`）。<br>2. **作用域**: 变量应尽可能保持在局部作用域内。 | ```scss<br>$primary-color: #3498db;<br>$base-font-size: 16px;<br><br>.header {<br>  $header-height: 60px; /* 局部变量 */<br>  height: $header-height;<br>} <br>``` |
| **Mixin** | Mixin 应用于抽象可重用的样式模式，特别是那些包含 CSS 规则和逻辑的模式。 | ```scss<br>// 一个用于清除浮动的 mixin<br>@mixin clearfix() {<br>  &::after {<br>    content: "";<br>    display: table;<br>    clear: both;<br>  }<br>} <br>``` |

---

### 总结 (Conclusion)

Google CSS 样式指南的核心目标是**可维护性**。通过遵循以下三大原则，可以编写出高质量的 CSS：

1.  **一致性 (Consistency)**：统一的格式和命名让代码库如同出自一人之手，易于理解和修改。
2.  **可预测性 (Predictability)**：简单的选择器、低特异性和模块化的命名，使得样式的行为更容易预测，减少了意外的副作用。
3.  **组件化 (Component-based)**：将 UI 拆分为独立的、可复用的组件，并为其编写独立的样式。这种思想使得代码库更具扩展性，也更容易管理。
好的，这是一份根据 Google 的 HTML/CSS Style Guide 对 HTML 书写规范进行完整分类的文档。这份文档旨在帮助开发者编写出具有高度可读性、可维护性和一致性的高质量 HTML 代码。

---

### **Google HTML 风格指南 (Style Guide) 完整分类文档**

#### **一、 引言与核心原则**

Google 的 HTML 风格指南不仅仅是一系列规则，它背后蕴含着一套核心的开发哲学。在深入具体规则之前，理解这些原则至关重要。

*   **关注点分离 (Separation of Concerns)**：
    *   **结构 (Structure)**: HTML
    *   **表现 (Presentation)**: CSS
    *   **行为 (Behavior)**: JavaScript
    *   **核心要求**：严格禁止在 HTML 中使用任何表现型标签（如 `<font>`, `<center>`）或内联样式属性（`style="..."`），除非有绝对必要的理由。结构、表现和行为应在各自的文件中进行管理。

*   **代码验证 (Validation)**：
    *   **核心要求**：始终编写符合 W3C 标准的有效 (Valid) HTML 代码。使用 [W3C HTML Validator](https://validator.w3.org/) 等工具定期检查代码，以捕获错误并确保跨浏览器的一致性。

*   **实用性优先 (Practicality over Purity)**：
    *   **核心要求**：遵循规范，但当规范对性能、文件大小或开发效率产生显著负面影响时，可以做出明智的、有注释说明的妥协。编写的代码首先要服务于用户和项目。

*   **可访问性 (Accessibility, a11y)**：
    *   **核心要求**：编写的 HTML 必须对所有用户（包括使用屏幕阅读器等辅助技术的用户）友好。这是隐含在许多规则中的基本要求。

---

#### **二、 通用格式规范 (General Formatting Rules)**

这部分规定了代码的视觉外观，以确保团队成员之间的代码风格一致。

*   **缩进 (Indentation)**：
    *   **规则**：使用 **2 个空格** 进行缩进。
    *   **禁止**：绝对不要使用 Tab 字符进行缩进。
    *   **理由**：空格在所有编辑器和环境中表现一致，避免了因 Tab 宽度设置不同导致的代码混乱。

*   **大小写 (Casing)**：
    *   **规则**：所有标签名、属性名都必须使用 **小写**。
    *   **示例**：
        ```html
        <!-- Good -->
        <img src="google.png" alt="Google">

        <!-- Bad -->
        <IMG SRC="google.png" ALT="Google">
        ```

*   **行尾空格 (Trailing Whitespace)**：
    *   **规则**：删除所有行尾的空格。
    *   **理由**：行尾空格是无意义的，会造成不必要的代码差异（diffs）。

*   **注释 (Comments)**：
    *   **规则**：在必要时使用注释来解释代码的**目的（Why）**，而不是**内容（What）**。对于复杂的模块或有特殊逻辑的部分，注释是必不可少的。
    *   **示例**：
        ```html
        <!-- Good: 解释了为什么需要一个额外的 wrapper -->
        <!-- The additional wrapper is required to achieve the parallax background effect. -->
        <div class="parallax-wrapper">
          ...
        </div>

        <!-- Bad: 冗余的注释 -->
        <!-- A navigation menu -->
        <nav>
          ...
        </nav>
        ```

---

#### **三、 通用语法规范 (General Syntax Rules)**

这部分是关于 HTML 语法的硬性规定。

*   **文档类型 (DOCTYPE)**：
    *   **规则**：所有 HTML 文档都必须以 `<!DOCTYPE html>` 开头。
    *   **理由**：这会触发所有现代浏览器的“标准模式”，确保渲染行为的一致性。

*   **字符编码 (Character Encoding)**：
    *   **规则**：必须在 `<head>` 标签的**第一个子元素**位置声明字符编码为 **UTF-8**。
    *   **示例**：
        ```html
        <head>
          <meta charset="UTF-8">
          <title>Page Title</title>
        </head>
        ```
    *   **理由**：尽早声明可以避免浏览器在解析时猜错编码而导致内容乱码。UTF-8 是最通用和推荐的编码。

*   **属性引号 (Attribute Quotes)**：
    *   **规则**：所有属性值都必须使用 **双引号 (`"`)** 包裹。
    *   **禁止**：不使用引号或使用单引号 (`'`)。
    *   **示例**：
        ```html
        <!-- Good -->
        <a class="link" href="#">Link</a>

        <!-- Bad -->
        <a class='link' href="#">Link</a>
        <a class=link href="#">Link</a>
        ```

*   **标签闭合 (Closing Tags)**：
    *   **规则**：所有非自闭合标签（如 `<div>`, `<p>`, `<li>`）都必须有明确的闭合标签。
    *   **自闭合标签 (Void elements)**：对于 `<img>`, `<br>`, `<hr>`, `<input>` 等自闭合标签，**不要** 在末尾添加斜杠 (`/`)。这是 HTML5 的标准。
    *   **示例**：
        ```html
        <!-- Good -->
        <p>Some text.</p>
        <img src="image.jpg" alt="Description">

        <!-- Bad -->
        <p>Some text.
        <img src="image.jpg" alt="Description" />
        ```

*   **布尔属性 (Boolean Attributes)**：
    *   **规则**：对于布尔属性，只需声明属性名，**不要** 指定值。
    *   **示例**：
        ```html
        <!-- Good -->
        <input type="text" disabled>
        <input type="checkbox" value="1" checked>

        <!-- Bad -->
        <input type="text" disabled="disabled">
        <input type="checkbox" value="1" checked="checked">
        ```

---

#### **四、 HTML 元素使用规范**

这部分关注如何正确、语义化地使用 HTML 标签。

*   **HTML5 语义化标签**：
    *   **规则**：尽可能使用 HTML5 语义化标签（`<header>`, `<footer>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`），而不是滥用 `<div>`。
    *   **理由**：语义化标签能极大地提升代码的可读性、可访问性（对屏幕阅读器友好）和 SEO。

*   **多媒体标签 (`<img>`)**：
    *   **规则**：`alt` 属性是**必需的**。
    *   **详细说明**：
        *   如果图片是**内容的一部分**，`alt` 属性必须提供对图片的准确描述。
        *   如果图片纯粹是**装饰性的**（例如背景图案、分隔线），`alt` 属性应设置为空值 (`alt=""`)。这会告诉屏幕阅读器忽略该图片。

*   **表格 (`<table>`)**：
    *   **规则**：表格**只能**用于展示表格化数据，**严禁**用于页面布局。
    *   **可访问性**：为了增强可访问性，应使用 `<caption>`, `<thead>`, `<tbody>`, `<th>`，并为 `<th>` 添加 `scope` 属性 (`scope="col"` 或 `scope="row"`)。

*   **实体引用 (HTML Entities)**：
    *   **规则**：**除非必要，否则不要使用 HTML 实体引用**。
    *   **详细说明**：
        *   由于文档编码是 UTF-8，可以直接使用像 `“`、`”`、`—`、`©` 这样的字符，而无需写成 `&ldquo;`、`&rdquo;`、`&mdash;`、`&copy;`。
        *   **唯一的例外**是那些在 HTML 中有特殊含义的字符：`<` (`&lt;`), `>` (`&gt;`), `&` (`&amp;`)。这些必须进行转义。

---

#### **五、 CSS 和 JavaScript 集成规范**

这部分规定了如何在 HTML 中引入 CSS 和 JavaScript。

*   **引入 CSS**：
    *   **规则**：使用 `<link>` 标签在 `<head>` 中引入外部 CSS 文件。
    *   **禁止**：避免使用 `@import`，它会影响页面加载性能。尽量避免使用 `<style>` 块，除非是针对特定页面的、无法复用的小段样式。

*   **引入 JavaScript**：
    *   **规则**：将 `<script>` 标签放置在 `</body>` 标签**之前**。
    *   **理由**：这可以防止脚本的下载和执行阻塞页面的渲染，从而提升用户感知的加载速度。
    *   **补充**：对于不需要阻塞渲染的脚本，可以使用 `defer` 或 `async` 属性来进一步优化加载。

---

#### **六、 总结与工具**

*   **一致性是关键**：即使你不同意某些规则，整个团队保持一致的风格也比各自为战要好得多。
*   **使用工具自动化**：
    *   **Linter (代码检查工具)**：使用如 [HTMLHint](https://htmlhint.com/) 等工具，配置符合 Google 风格的规则，可以在编码过程中自动发现并修复问题。
    *   **Validator (代码验证工具)**：定期使用 W3C 验证器确保代码的有效性。

遵循这份指南，你将能编写出清晰、高效、专业且易于协作的 HTML 代码。
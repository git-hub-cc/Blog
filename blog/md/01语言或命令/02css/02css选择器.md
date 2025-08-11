# CSS 选择器完整分类与深度解析

## 引言

CSS 选择器是 CSS（层叠样式表）的基石。它们是连接 HTML 文档与 CSS 样式的桥梁，通过定义一系列规则来“选择”需要应用样式的 HTML 元素。熟练掌握各种选择器及其用法，是编写高效、可维护和精确 CSS 代码的关键。

本文档将 CSS 选择器系统地分为以下几大类：
1.  **基础选择器 (Basic Selectors)**
2.  **组合器 (Combinators)**
3.  **伪类选择器 (Pseudo-class Selectors)**
4.  **伪元素选择器 (Pseudo-element Selectors)**
5.  **属性选择器 (Attribute Selectors)**
6.  **分组选择器 (Grouping Selector)**

此外，我们还将讨论 **选择器优先级 (Specificity)** 和 **性能与最佳实践**。

---

## 1. 基础选择器 (Basic Selectors)

基础选择器是构成所有更复杂选择器的基本单位。

| 名称 | 语法 | 描述 | 示例 |
| :--- | :--- | :--- | :--- |
| **类型选择器** (Type Selector) | `element_name` | 选择指定类型的所有 HTML 元素。 | `p { color: grey; }` |
| **类选择器** (Class Selector) | `.class_name` | 选择所有带有该 `class` 属性的元素。 | `.warning { color: red; }` |
| **ID 选择器** (ID Selector) | `#id_name` | 选择具有特定 `id` 属性的唯一元素。**一个页面中 ID 必须是唯一的**。 | `#main-header { font-size: 2em; }` |
| **通用选择器** (Universal Selector) | `*` | 选择所有元素。通常用于重置样式。 | `* { box-sizing: border-box; }` |

---

## 2. 组合器 (Combinators)

组合器用于结合多个基础选择器，以表达元素之间的层级和位置关系。

| 名称 | 语法 | 描述 | 示例 |
| :--- | :--- | :--- | :--- |
| **后代组合器** (Descendant Combinator) | `A B` (空格) | 选择所有位于 `A` 元素内部的 `B` 元素（无论层级多深）。 | `div p { color: blue; }` |
| **子代组合器** (Child Combinator) | `A > B` | 选择所有作为 `A` 元素直接子元素的 `B` 元素。 | `ul > li { list-style: none; }` |
| **相邻兄弟组合器** (Adjacent Sibling Combinator) | `A + B` | 选择紧接在 `A` 元素之后的同级 `B` 元素。 | `h1 + p { margin-top: 0; }` |
| **通用兄弟组合器** (General Sibling Combinator) | `A ~ B` | 选择所有在 `A` 元素之后的同级 `B` 元素（不要求紧邻）。 | `h1 ~ p { color: darkgray; }` |

---

## 3. 伪类选择器 (Pseudo-class Selectors)

伪类选择器用于为元素的某些特殊状态或位置应用样式，这些状态无法通过简单的基础选择器来表达。伪类以一个冒号 (`:`) 开头。

### 3.1 动态/用户行为伪类

| 伪类 | 描述 | 示例 |
| :--- | :--- | :--- |
| `:link` | 选择未被访问过的链接。 | `a:link { color: blue; }` |
| `:visited` | 选择已被用户访问过的链接。 | `a:visited { color: purple; }` |
| `:hover` | 选择鼠标指针悬停在其上的元素。 | `button:hover { background-color: lightgray; }` |
| `:active` | 选择被用户激活（例如点击）的元素。 | `button:active { transform: scale(0.98); }` |
| `:focus` | 选择获得焦点的元素（如通过键盘 Tab 或点击表单输入框）。 | `input:focus { border-color: blue; }` |
| `:focus-within` | 选择自身或其后代元素获得焦点的元素。 | `form:focus-within { box-shadow: 0 0 5px blue; }` |
| `:focus-visible` | 当元素通过键盘等非指针方式获得焦点时匹配，用于改善可访问性。 | `a:focus-visible { outline: 2px solid blue; }` |

### 3.2 位置/结构伪类

| 伪类 | 描述 | 示例 |
| :--- | :--- | :--- |
| `:root` | 选择文档的根元素，在 HTML 中通常是 `<html>` 元素。常用于定义全局 CSS 变量。 | `:root { --main-color: #333; }` |
| `:empty` | 选择没有任何子元素（包括文本节点）的元素。 | `div:empty { display: none; }` |
| `:first-child` | 选择作为其父元素的第一个子元素的元素。 | `li:first-child { font-weight: bold; }` |
| `:last-child` | 选择作为其父元素的最后一个子元素的元素。 | `li:last-child { border-bottom: none; }` |
| `:only-child` | 选择作为其父元素唯一子元素的元素。 | `p:only-child { font-size: 1.2em; }` |
| `:nth-child(n)` | 选择其父元素的第 n 个子元素。`n` 可以是数字、`odd`、`even` 或公式 (如 `2n+1`)。 | `tr:nth-child(odd) { background: #f2f2f2; }` |
| `:nth-last-child(n)` | 从后往前计算，选择其父元素的第 n 个子元素。 | `li:nth-last-child(2) { color: red; }` |
| `:first-of-type` | 选择其父元素下，同类型兄弟元素中的第一个。 | `p:first-of-type { font-weight: bold; }` |
| `:last-of-type` | 选择其父元素下，同类型兄弟元素中的最后一个。 | `p:last-of-type { margin-bottom: 0; }` |
| `:only-of-type` | 选择其父元素下，没有其他同类型兄弟元素的元素。 | `h2:only-of-type { text-align: center; }` |
| `:nth-of-type(n)` | 选择其父元素下，同类型兄弟元素中的第 n 个。 | `p:nth-of-type(2) { text-indent: 2em; }` |
| `:nth-last-of-type(n)` | 从后往前计算，选择其父元素下，同类型兄弟元素中的第 n 个。 | `img:nth-last-of-type(1) { border: 2px solid red; }`|

### 3.3 逻辑组合伪类

| 伪类 | 描述 | 示例 |
| :--- | :--- | :--- |
| `:not(X)` | 选择不匹配选择器 `X` 的元素。 | `p:not(.highlight) { color: black; }` |
| `:is(X, Y, ...)` | 如果元素匹配括号内任一选择器，则该元素被选中。其优先级由参数中优先级最高的选择器决定。 | `:is(header, main, footer) p { line-height: 1.5; }` |
| `:where(X, Y, ...)` | 功能与 `:is()` 相同，但其**优先级始终为 0**，非常适合用于编写可覆盖的基础样式库。 | `:where(h1, h2, h3) { margin-top: 1em; }` |

### 3.4 表单/输入状态伪类

| 伪类 | 描述 |
| :--- | :--- |
| `:checked` | 选择处于选中状态的 `<input type="checkbox">`、`<input type="radio">` 或 `<option>` 元素。 |
| `:disabled` | 选择被禁用的表单元素。 |
| `:enabled` | 选择未被禁用的表单元素。 |
| `:required` | 选择设有 `required` 属性的表单元素。 |
| `:optional` | 选择没有 `required` 属性的表单元素。 |
| `:read-only` | 选择设有 `readonly` 属性的元素。 |
| `:read-write` | 选择用户可编辑的元素（如 `<input>` 或设置了 `contenteditable` 的元素）。 |
| `:in-range` | 选择值在 `min` 和 `max` 属性规定范围内的 `<input>` 元素。 |
| `:out-of-range` | 选择值超出 `min` 和 `max` 属性规定范围的 `<input>` 元素。 |

---

## 4. 伪元素选择器 (Pseudo-element Selectors)

伪元素用于为元素的特定部分应用样式，这些部分并非独立的 DOM 元素。现代 CSS 规范建议伪元素使用双冒号 (`::`)，以区别于伪类。

> **注意**：为了兼容旧版浏览器（如 IE8），单冒号 (`:`) 版本的伪元素（如 `:before`）仍然有效。但建议在现代项目中使用双冒号。

| 伪元素 | 描述 | 示例 |
| :--- | :--- | :--- |
| `::before` | 在元素内容之前创建一个伪元素。必须与 `content` 属性配合使用。 | `a::before { content: "🔗 "; }` |
| `::after` | 在元素内容之后创建一个伪元素。必须与 `content` 属性配合使用。 | `.clearfix::after { content: ""; display: block; clear: both; }` |
| `::first-letter` | 选择块级元素的第一行中的第一个字母。 | `p::first-letter { font-size: 200%; float: left; }` |
| `::first-line` | 选择块级元素的第一行文本。 | `p::first-line { font-weight: bold; }` |
| `::marker` | 选择列表项（`<li>`）的标记符号（如项目符号或编号）。 | `li::marker { color: red; font-size: 1.2em; }` |
| `::selection` | 选择用户高亮选中的部分文本。 | `::selection { background: yellow; color: black; }` |
| `::placeholder` | 选择表单元素（如 `<input>` 或 `<textarea>`）的占位文本。 | `input::placeholder { color: #999; }` |

---

## 5. 属性选择器 (Attribute Selectors)

属性选择器根据元素是否具有某个属性或属性值来选择元素。

| 语法 | 描述 | 示例 |
| :--- | :--- | :--- |
| `[attr]` | 选择所有带有 `attr` 属性的元素。 | `a[title] { text-decoration: underline; }` |
| `[attr=value]` | 选择 `attr` 属性值**完全等于** `value` 的元素。 | `input[type="submit"] { background-color: blue; }` |
| `[attr~=value]` | 选择 `attr` 属性值包含 `value` 的元素，`value` 是一个以空格分隔的完整单词。 | `p[class~="important"] { font-weight: bold; }` |
| `[attr|=value]` | 选择 `attr` 属性值等于 `value` 或以 `value-` 开头的元素（常用于语言代码）。 | `p[lang|="en"] { font-family: 'Times New Roman'; }` |
| `[attr^=value]` | 选择 `attr` 属性值以 `value` **开头**的元素。 | `a[href^="https://"] { color: green; }` |
| `[attr$=value]` | 选择 `attr` 属性值以 `value` **结尾**的元素。 | `a[href$=".pdf"] { content: " (PDF)"; }` |
| `[attr*=value]` | 选择 `attr` 属性值**包含**子字符串 `value` 的元素。 | `a[href*="example.com"] { border-bottom: 1px dotted; }` |

---

## 6. 分组选择器 (Grouping Selector)

分组选择器使用逗号 (`,`) 将多个选择器连接起来，为它们应用相同的样式规则，从而减少代码重复。

- **语法**: `selector1, selector2, ...`
- **描述**: 同时选择匹配 `selector1`、`selector2` 等所有选择器的元素。
- **示例**:
  ```css
  h1, h2, h3 {
    font-family: 'Georgia', serif;
    color: #333;
  }
  ```

---

## 附录 A: 选择器优先级 (Specificity)

当多个 CSS 规则应用于同一个元素时，浏览器通过计算选择器的优先级来决定哪条规则生效。优先级高的规则会覆盖优先级低的规则。

优先级的计算可以看作一个四元组 `(A, B, C, D)`：

1.  **A (内联样式)**: 如果样式写在元素的 `style` 属性中，A=1，否则为 0。
2.  **B (ID 选择器)**: 计算选择器中 ID 的数量。
3.  **C (类、伪类、属性选择器)**: 计算选择器中类 (`.class`)、伪类 (`:hover`) 和属性 (`[type="text"]`) 的数量。
4.  **D (类型、伪元素选择器)**: 计算选择器中类型 (`div`) 和伪元素 (`::before`) 的数量。

**比较规则**：从左到右依次比较 A, B, C, D。数值大的胜出。例如，`(0,1,0,0)` 高于 `(0,0,10,0)`。

-   **示例**：
    -   `#nav a`: 优先级为 `(0, 1, 0, 1)` -> 1 个 ID, 1 个类型。
    -   `div.content p:hover`: 优先级为 `(0, 0, 2, 2)` -> 2 个类/伪类, 2 个类型。

**特殊情况**：

-   **`!important`**: 任何带有 `!important` 的规则都具有最高优先级，会覆盖所有其他规则（包括内联样式）。应谨慎使用。
-   **通用选择器 (`*`) 和 `:where()`**: 优先级为 `(0, 0, 0, 0)`。
-   **:is() 和 :not()**: 优先级由其参数中优先级最高的选择器决定。

---

## 附录 B: 性能与最佳实践

1.  **保持选择器简洁**: 避免过长的选择器链（如 `div > .main > ul > li > a`）。这会增加浏览器的渲染负担，并使 CSS 难以维护。
2.  **优先使用类**: 类选择器在性能和可重用性之间取得了很好的平衡。尽量使用类来定义组件，而不是依赖复杂的标签层级。
3.  **ID 是唯一的，谨慎使用**: ID 具有很高的优先级，难以覆盖。通常只用于页面主要布局结构或 JavaScript 钩子。
4.  **理解从右到左的匹配规则**: 浏览器匹配选择器时，是从右向左进行的。例如，对于 `div p`，浏览器会先找到所有 `<p>` 元素，然后检查它们的祖先是否有 `<div>`。因此，最右侧的选择器（关键选择器）越具体，性能越好。
5.  **善用现代选择器**: 使用 `:is()` 和 `:where()` 可以大大简化复杂的选择器列表，并更好地控制优先级。
6.  **避免通用选择器**: 尽量避免在没有必要时使用 `*`，尤其是在复杂的组合中。
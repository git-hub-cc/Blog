### **HTML 属性完整分类大全**

#### **一、 前言与基本概念**

HTML 属性 (Attributes) 是为 HTML 标签（元素）提供附加信息的关键部分。它们总是以 `名称="值"` 的键值对形式出现，并且总是在元素的开始标签中指定。

**基本语法：**
`<tagname attribute_name="value">内容</tagname>`

**例如：**
`<a href="https://www.example.com">这是一个链接</a>`
在这里，`href` 是属性名，`https://www.example.com` 是属性值。

属性可以用来：
*   **修改元素的行为** (例如 `href` 使 `<a>` 标签可点击)
*   **提供元数据** (例如 `alt` 为图片提供替代文本)
*   **应用样式或脚本** (例如 `class` 和 `style` 用于 CSS，`onclick` 用于 JavaScript)

---

#### **二、 核心分类：全局属性 (Global Attributes)**

全局属性是可以应用于**所有** HTML 元素的通用属性。它们是 HTML 中最常用和最重要的属性。

*   `id`：为元素定义一个**唯一**的标识符。在整个文档中，`id` 的值必须是唯一的。主要用于 JavaScript 操作（`getElementById`）和页面内锚点链接。
*   `class`：为元素指定一个或多个类名（用空格分隔）。主要用于 CSS 选择器来应用样式，以及 JavaScript 操作（`getElementsByClassName`）。
*   `style`：为元素应用**内联 CSS 样式**。例如 `style="color: red; font-size: 14px;"`。通常建议将样式放在外部 CSS 文件中，而不是使用此属性。
*   `title`：提供关于元素的额外信息。当鼠标悬停在元素上时，通常会以提示框的形式显示 `title` 的内容。
*   `lang`：指定元素内容的语言代码（如 `en` 表示英语，`zh-CN` 表示简体中文）。有助于搜索引擎和浏览器。
*   `dir`：指定元素内容的文本方向。`ltr` (从左到右) 或 `rtl` (从右到左)。
*   `hidden`：一个布尔属性，用于隐藏一个元素。被隐藏的元素不会被显示。
*   `tabindex`：指定元素的 Tab 键导航顺序。正值定义顺序，`0` 表示按源顺序，`-1` 表示元素不能通过 Tab 键访问。
*   `accesskey`：指定激活或聚焦元素的快捷键。
*   `draggable`：指定元素是否可拖动。`true`, `false`, 或 `auto`。
*   `contenteditable`：指定元素的内容是否可由用户编辑。
*   `data-*`：自定义数据属性。用于存储页面或应用程序的私有自定义数据。属性名必须以 `data-` 开头，例如 `<div data-user-id="123"></div>`。

---

#### **三、 按功能分类详解**

除了全局属性，大部分属性都是特定于某些标签的。我们可以按照它们的功能进行分类。

##### **1. 链接与资源属性 (Link & Resource Attributes)**

这些属性定义了元素与外部资源或链接的关系。

*   `href`：(用于 `<a>`, `<link>`, `<area>`, `<base>`) 指定链接目标的 URL。
*   `src`：(用于 `<img>`, `<script>`, `<audio>`, `<video>`, `<iframe>`, `<input type="image">`) 指定要嵌入的外部资源的 URL。
*   `alt`：(用于 `<img>`, `<area>`, `<input type="image">`) 提供图像的**替代文本**。当图像无法加载时显示，对于屏幕阅读器至关重要，是可访问性（a11y）的核心。
*   `rel`：(用于 `<a>`, `<link>`, `<form>`) 指定当前文档与被链接文档之间的关系。常见值有 `stylesheet`, `icon`, `nofollow`。
*   `target`：(用于 `<a>`, `<form>`, `<base>`) 指定在何处打开链接。常见值有 `_self` (当前窗口)、`_blank` (新窗口)、`_parent`, `_top`。
*   `download`：(用于 `<a>`) 表明链接用于下载文件，而不是导航。可以指定下载后的文件名。
*   `crossorigin`：(用于 `<audio>`, `<img>`, `<link>`, `<script>`, `<video>`) 配置对跨域资源的 CORS 请求。
*   `integrity`：(用于 `<link>`, `<script>`) 提供一个哈希值，允许浏览器检查获取的资源是否被篡改（子资源完整性 Subresource Integrity, SRI）。
*   `width` 和 `height`：(用于 `<img>`, `<canvas>`, `<video>`, `<iframe>`, `<embed>`, `<object>`) 指定资源的宽度和高度（像素）。为图像指定尺寸可以防止页面加载时布局抖动。

##### **2. 表单与输入属性 (Form & Input Attributes)**

这些属性是构建交互式表单的核心。

*   **`<form>` 专属属性:**
    *   `action`：指定表单提交后，处理数据的服务器端脚本的 URL。
    *   `method`：指定提交表单时使用的 HTTP 方法。`get` (默认) 或 `post`。
    *   `enctype`：当 `method` 为 `post` 时，指定表单数据的编码类型。`application/x-www-form-urlencoded` (默认), `multipart/form-data` (用于文件上传), `text/plain`。
    *   `novalidate`：一个布尔属性，表示提交表单时不进行验证。
    *   `autocomplete`：指定表单是否应启用自动完成功能。`on` 或 `off`。

*   **`<input>`, `<textarea>`, `<select>`, `<button>` 等控件属性:**
    *   `type`：(用于 `<input>`) **最重要的属性**，定义了输入框的类型，如 `text`, `password`, `checkbox`, `radio`, `submit`, `button`, `file`, `date`, `email`, `number` 等。
    *   `name`：定义控件的名称。在表单提交时，`name` 作为数据的键名。
    *   `value`：定义控件的初始值或提交值。
    *   `placeholder`：提供一个简短的提示，描述输入字段的期望值。
    *   `required`：一个布尔属性，表示该字段在提交前必须填写。
    *   `disabled`：一个布尔属性，禁用该控件。被禁用的控件不可用、不可点击，并且其值不会随表单提交。
    *   `readonly`：一个布尔属性，表示该字段为只读。用户无法修改，但其值会随表单提交。
    *   `checked`：(用于 `input type="radio"` 或 `type="checkbox"`) 一个布尔属性，表示默认选中。
    *   `selected`：(用于 `<option>`) 一个布尔属性，表示该选项默认被选中。
    *   `multiple`：(用于 `input type="file"` 和 `<select>`) 一个布尔属性，表示允许用户选择多个值。
    *   `pattern`：(用于 `<input>`) 指定一个正则表达式，用于验证输入值。
    *   `min`, `max`, `step`：(用于数字、日期等类型的 `<input>`) 定义允许的最小值、最大值和步长。
    *   `for`：(用于 `<label>`) 将标签与一个表单控件关联起来，其值应为对应控件的 `id`。点击标签即可聚焦到关联的控件，提升可访问性。

##### **3. 脚本与事件处理属性 (Scripting & Event Handler Attributes)**

这些属性用于在用户与元素交互时触发 JavaScript 代码。它们通常以 `on` 开头。

*   `onclick`：鼠标单击事件。
*   `onload`：页面或元素（如图像）加载完成事件。
*   `onchange`：元素值改变事件（如 `<input>`, `<select>`）。
*   `onmouseover` / `onmouseout`：鼠标移入/移出事件。
*   `onkeydown` / `onkeyup`：键盘按下/抬起事件。
*   `onsubmit`：表单提交事件（用于 `<form>`）。

**注意**：在现代 Web 开发中，通常推荐使用 JavaScript 的 `addEventListener()` 方法来绑定事件，而不是直接在 HTML 中使用这些内联事件属性，以实现更好的关注点分离。

##### **4. 语义与元数据属性 (Semantic & Metadata Attributes)**

这些属性为元素提供更丰富的语义信息或元数据。

*   `datetime`：(用于 `<time>`) 以机器可读的格式指定日期和时间。
*   `charset`：(用于 `<meta>`) 指定文档的字符编码，通常是 `UTF-8`。
*   `name` 和 `content`：(用于 `<meta>`) 一起使用，以键值对的形式提供文档元数据，如 `description`, `keywords`, `author`, `viewport`。
*   `scope`：(用于 `<th>`) 指定表头单元格是作用于行 (`row`)、列 (`col`)、行组 (`rowgroup`) 还是列组 (`colgroup`)，提升表格的可访问性。

##### **5. 表格布局属性 (Table Layout Attributes)**

*   `colspan`：(用于 `<td>`, `<th>`) 指定一个单元格可以横跨的列数。
*   `rowspan`：(用于 `<td>`, `<th>`) 指定一个单元格可以竖跨的行数。

---

#### **四、 已废弃 (Deprecated) 的表现型属性**

这些属性在旧的 HTML 标准中用于控制样式和布局，但现在已被 CSS 取代。**不应在新的项目中使用它们**。

*   `align`：(用于 `<p>`, `<div>`, `<table>` 等) 定义对齐方式。**替代方案：CSS `text-align`, `margin: auto` 等。**
*   `bgcolor`：定义背景颜色。**替代方案：CSS `background-color`。**
*   `border`：定义边框宽度。**替代方案：CSS `border`。**
*   `color`：(用于 `<font>`, `<basefont>`) 定义文本颜色。**替代方案：CSS `color`。**
*   `width`, `height`：当用于除媒体元素（`<img>`, `video`等）之外的元素（如 `<table>`, `<td>`）时，被视为表现型属性。**替代方案：CSS `width`, `height`。**
*   `cellpadding`, `cellspacing`：(用于 `<table>`) 控制单元格内边距和单元格间距。**替代方案：CSS `padding` 和 `border-spacing`。**

---

#### **五、 总结与最佳实践**

1.  **优先使用全局属性**：`id`, `class`, `title` 和 `data-*` 是构建现代、可交互网页的基石。
2.  **结构、表现、行为分离**：
    *   用 HTML 属性定义**结构**（如 `href`, `src`）、**语义**（如 `alt`, `scope`）和**基本行为**（如 `required`, `disabled`）。
    *   用 **CSS** 处理所有**样式和表现**（颜色、字体、布局、对齐）。
    *   用 **JavaScript** 处理复杂的**交互和事件**。
3.  **重视可访问性 (a11y)**：始终使用 `alt` 属性为图像提供描述，使用 `for` 属性关联 `label` 和表单控件。
4.  **参考权威文档**：当不确定某个属性的用途或适用范围时，查阅 [MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes) 是最好的选择。
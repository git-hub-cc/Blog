### **CSS 属性值大全 (第一部分：文本与字体)**

#### **前言**

本文档在前一版分类的基础上，为每个 CSS 属性补充了其可能的属性值。值的类型主要包括：

*   **关键字 (Keywords):** 如 `auto`, `none`, `bold`, `left` 等预设的单词。
*   **数据类型:**
    *   **`<length>`:** 长度单位。
        *   **绝对单位:** `px` (像素), `pt` (点), `pc` (派卡), `in` (英寸), `cm` (厘米), `mm` (毫米)。
        *   **相对单位:**
            *   `em`: 相对于元素自身的字体大小。
            *   `rem`: 相对于根元素 (`<html>`) 的字体大小。
            *   `%`: 相对于父元素的相应值。
            *   `vw`: 相对于视口宽度的 1%。
            *   `vh`: 相对于视口高度的 1%。
            *   `vmin`: 相对于视口较小一边的 1%。
            *   `vmax`: 相对于视口较大一边的 1%。
            *   `ch`: 相对于 "0" 字符的宽度。
            *   `ex`: 相对于 "x" 字符的高度。
        *   *注：`rpx` 是微信小程序等特定环境下的响应式像素单位，并非标准 CSS 单位。*
    *   **`<color>`:** 颜色值。
        *   **名称:** `red`, `transparent`。
        *   **HEX:** `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`。
        *   **函数:** `rgb()`, `rgba()`, `hsl()`, `hsla()`。
    *   **`<number>`:** 无单位的数字（如 `line-height`, `opacity`）。
    *   **`<angle>`:** 角度单位，如 `deg` (度), `rad` (弧度), `grad` (百分度), `turn` (圈)。
    *   **`<time>`:** 时间单位，如 `s` (秒), `ms` (毫秒)。
    *   **`<url>`:** 使用 `url()` 函数指向一个资源文件。
*   **函数 (Functions):** 如 `calc()`, `var()`, `linear-gradient()` 等。
*   **全局值 (Global Values):** 几乎所有属性都支持以下值：
    *   `inherit`: 继承父元素的计算值。
    *   `initial`: 恢复到属性的默认初始值。
    *   `revert`: 恢复到用户代理（浏览器）的默认样式。
    *   `unset`: 如果属性是可继承的，则行为同 `inherit`；否则同 `initial`。

---

### **1. 文本与字体 (Text & Typography)**

#### **1.1 字体属性 (Font Properties)**

**`font-family`**
*   **描述:** 定义元素的字体族。可以提供一个按优先级排序的列表，浏览器会选择第一个可用的字体。
*   **值:**
    *   `<family-name>`: 具体的字体名称，如 `"Times New Roman"`, `Arial`。如果名称包含空格，必须用引号包裹。
    *   `<generic-name>`: 通用字体族关键字，作为备选方案。
        *   `serif`: 衬线字体 (如 Times New Roman)。
        *   `sans-serif`: 无衬线字体 (如 Arial, Helvetica)。
        *   `monospace`: 等宽字体 (如 Courier New)。
        *   `cursive`: 手写体 (如 Comic Sans MS)。
        *   `fantasy`: 装饰性字体。
        *   `system-ui`: 使用当前操作系统的默认界面字体。
*   **示例:** `font-family: "Helvetica Neue", Arial, sans-serif;`

**`font-size`**
*   **描述:** 设置字体的大小。
*   **值:**
    *   **关键字 (绝对):** `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`。
    *   **关键字 (相对):** `larger` (比父元素稍大), `smaller` (比父元素稍小)。
    *   **`<length>`:** 使用具体的长度单位，如 `16px`, `1.2rem`, `1em`, `12pt`。
    *   **`<percentage>`:** 相对于父元素的字体大小，如 `80%`。
    *   **数学函数:** `calc()`。
*   **示例:** `font-size: 1.5rem;`

**`font-weight`**
*   **描述:** 设置字体的粗细。
*   **值:**
    *   **关键字:** `normal` (等同于 `400`), `bold` (等同于 `700`)。
    *   **关键字 (相对):** `lighter` (比父元素更细), `bolder` (比父元素更粗)。
    *   **数值:** `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`。
*   **示例:** `font-weight: 700;`

**`font-style`**
*   **描述:** 设置字体的样式。
*   **值:**
    *   `normal`: 正常字体。
    *   `italic`: 斜体。通常是字体的专用斜体版本。
    *   `oblique`: 倾斜体。通常是正常字体的倾斜版本。可以指定角度，如 `oblique 14deg`。
*   **示例:** `font-style: italic;`

**`font-variant`**
*   **描述:** 控制小型大写字母的显示。
*   **值:**
    *   `normal`: 默认值。
    *   `small-caps`: 将小写字母转换为小型大写字母。
*   **示例:** `font-variant: small-caps;`

**`line-height`**
*   **描述:** 设置行高。
*   **值:**
    *   `normal`: 默认值，通常约为 `1.2`，具体取决于浏览器和字体。
    *   **`<number>` (推荐):** 一个无单位的数字，表示字体大小的倍数。如 `1.5` 表示 `1.5 * font-size`。
    *   **`<length>`:** 一个具体的长度，如 `24px`。
    *   **`<percentage>`:** 相对于元素自身字体大小的百分比，如 `150%`。
*   **示例:** `line-height: 1.6;`

**`font` (简写属性)**
*   **描述:** 同时设置多个字体属性。
*   **语法:** `[font-style] [font-variant] [font-weight] [font-stretch] font-size [/line-height] font-family`
*   **注意:** `font-size` 和 `font-family` 是必需的。`line-height` 必须紧跟在 `font-size` 后面，并用 `/` 分隔。
*   **示例:** `font: italic bold 1rem/1.5 "Helvetica", sans-serif;`

#### **1.2 文本样式 (Text Styling)**

**`color`**
*   **描述:** 设置文本内容的颜色。
*   **值:**
    *   **`<color>`:** 所有有效的颜色表示法。
*   **示例:** `color: #333;`, `color: rgba(0, 0, 0, 0.8);`

**`text-align`**
*   **描述:** 设置块级元素或表格单元格内文本的水平对齐方式。
*   **值:**
    *   `left`: 左对齐。
    *   `right`: 右对齐。
    *   `center`: 居中对齐。
    *   `justify`: 两端对齐。
    *   `start`: 根据书写方向（`direction`）决定，`ltr` 时为 `left`，`rtl` 时为 `right`。
    *   `end`: 与 `start` 相反。
*   **示例:** `text-align: center;`

**`text-decoration` (简写属性)**
*   **描述:** 设置文本的装饰线。
*   **值:**
    *   可以组合 `text-decoration-line`, `text-decoration-color`, `text-decoration-style` 和 `text-decoration-thickness` 的值。
    *   **常用值:**
        *   `none`: 无任何装饰。
        *   `underline`: 下划线。
        *   `overline`: 上划线。
        *   `line-through`: 删除线。
*   **示例:** `text-decoration: underline dotted red 2px;`

**`text-transform`**
*   **描述:** 控制文本的大小写。
*   **值:**
    *   `none`: 不做任何转换。
    *   `capitalize`: 每个单词的首字母大写。
    *   `uppercase`: 所有字母转换为大写。
    *   `lowercase`: 所有字母转换为小写。
*   **示例:** `text-transform: uppercase;`

**`text-shadow`**
*   **描述:** 为文本添加阴影。可以添加多个阴影，用逗号分隔。
*   **语法:** `[x-offset] [y-offset] [blur-radius] [color]`
*   **值:**
    *   `x-offset`: `<length>` 水平偏移量。
    *   `y-offset`: `<length>` 垂直偏移量。
    *   `blur-radius` (可选): `<length>` 模糊半径，值越大越模糊。
    *   `color` (可选): `<color>` 阴影颜色。
*   **示例:** `text-shadow: 2px 2px 5px rgba(0,0,0,0.5);`

**`letter-spacing`**
*   **描述:** 设置字符之间的间距。
*   **值:**
    *   `normal`: 默认间距。
    *   `<length>`: 具体的长度值，可以是负数。
*   **示例:** `letter-spacing: 1px;`

**`word-spacing`**
*   **描述:** 设置单词之间的间距。
*   **值:**
    *   `normal`: 默认间距。
    *   `<length>`: 具体的长度值，可以是负数。
*   **示例:** `word-spacing: 4px;`

#### **1.3 文本布局 (Text Layout)**

**`vertical-align`**
*   **描述:** 设置行内元素或表格单元格的垂直对齐方式。
*   **值:**
    *   **相对于父元素:** `baseline` (默认), `sub`, `super`, `text-top`, `text-bottom`, `middle`。
    *   **相对于行:** `top`, `bottom`。
    *   **`<length>`:** 具体的长度值，`0` 等同于 `baseline`。
    *   **`<percentage>`:** 相对于 `line-height` 的百分比。
*   **示例:** `vertical-align: middle;`

**`white-space`**
*   **描述:** 控制元素内的空白符（空格、制表符、换行符）如何处理。
*   **值:**
    *   `normal`: 连续的空白符合并，换行符视为普通空白符，内容在必要时自动换行。
    *   `nowrap`: 连续的空白符合并，但文本不换行。
    *   `pre`: 保留所有空白符和换行符，行为类似 HTML 的 `<pre>` 标签。
    *   `pre-wrap`: 保留空白符，但允许自动换行。
    *   `pre-line`: 合并空白符，但保留换行符。
    *   `break-spaces`: 与 `pre-wrap` 类似，但任何保留的空白序列都会占据空间并可能在行尾换行。
*   **示例:** `white-space: nowrap;`

**`text-overflow`**
*   **描述:** 控制当溢出的内容不显示时如何表现。通常需要配合 `overflow: hidden` 和 `white-space: nowrap` 使用。
*   **值:**
    *   `clip`: 直接裁剪，不显示任何提示。
    *   `ellipsis`: 在末尾显示省略号（...）。
*   **示例:** `text-overflow: ellipsis;`

**`text-indent`**
*   **描述:** 设置块级元素第一行文本的缩进。
*   **值:**
    *   **`<length>`:** 具体的长度值。
    *   **`<percentage>`:** 相对于包含块宽度的百分比。
*   **示例:** `text-indent: 2em;`

**`writing-mode`**
*   **描述:** 定义文本的排列方向（水平或垂直）。
*   **值:**
    *   `horizontal-tb`: 水平方向，从上到下（默认）。
    *   `vertical-rl`: 垂直方向，从右到左。
    *   `vertical-lr`: 垂直方向，从左到右。
*   **示例:** `writing-mode: vertical-rl;`

### **2. 盒模型 (Box Model)**

每个 HTML 元素都可以看作一个矩形的盒子。这个盒子由四个部分组成：内容区 (Content)、内边距 (Padding)、边框 (Border) 和外边距 (Margin)。

**`width`** / **`height`**
*   **描述:** 设置元素**内容区域**的宽度或高度。注意：其最终作用受 `box-sizing` 属性影响。
*   **值:**
    *   **`<length>`:** 任何有效的长度单位，如 `300px`, `50vw`, `20em`, `10rem`。
    *   **`<percentage>`:** 相对于其包含块（containing block）的宽度或高度的百分比。例如，`width: 50%;` 表示宽度是父元素宽度的一半。
    *   `auto`: 浏览器根据其他属性（如内容大小）自动计算。对于块级元素，`width: auto` 通常会使其扩展以填充父容器的可用宽度。
    *   `max-content`: 固有的首选宽度/高度，即内容不换行时的宽度。
    *   `min-content`: 固有的最小宽度/高度，即内容尽可能多地换行后的宽度。
    *   `fit-content(<length-percentage>)`: 使用可用空间，但最大不超过指定值。
    *   **数学函数:** `calc()`，例如 `width: calc(100% - 20px);`。
*   **示例:** `width: 100%;`, `height: 100vh;`

**`min-width`** / **`max-width`** & **`min-height`** / **`max-height`**
*   **描述:** 为元素的宽度和高度设置最小和最大限制。`max-width` 对于创建响应式图像和容器特别有用。
*   **值:**
    *   **`<length>`:** 同 `width`/`height`。
    *   **`<percentage>`:** 同 `width`/`height`。
    *   `none`: （仅用于 `max-*` 属性）不设任何上限。
    *   `auto`: （仅用于 `min-*` 属性）默认值，不设下限。
    *   `max-content`, `min-content`, `fit-content()`: 同 `width`/`height`。
    *   **数学函数:** `calc()`。
*   **示例:** `max-width: 1200px;`, `min-height: 50vh;`

**`padding` (简写属性)**
*   **描述:** 设置元素内容区域与边框之间的空间，即内边距。不支持负值。
*   **语法 (1-4 个值):**
    *   `padding: value;` (四边相同)
    *   `padding: top-bottom left-right;` (上下、左右)
    *   `padding: top left-right bottom;` (上、左右、下)
    *   `padding: top right bottom left;` (上、右、下、左)
*   **值:**
    *   **`<length>`:** 如 `10px`, `1.5em`。
    *   **`<percentage>`:** 相对于**包含块的宽度**的百分比（无论是 `padding-top/bottom` 还是 `padding-left/right`）。
    *   **数学函数:** `calc()`。
*   **示例:** `padding: 1rem 2rem;`

**`padding-top`**, **`padding-right`**, **`padding-bottom`**, **`padding-left`**
*   **描述:** 单独设置某个方向的内边距。
*   **值:**
    *   **`<length>`**, **`<percentage>`**, **`calc()`**
*   **示例:** `padding-left: 20px;`

**`margin` (简写属性)**
*   **描述:** 设置元素边框外的空间，即外边距。可以为负值。相邻块级元素的垂直外边距可能会发生“外边距折叠”。
*   **语法 (1-4 个值):** 与 `padding` 相同。
*   **值:**
    *   **`<length>`:** 如 `10px`, `-5px`。
    *   **`<percentage>`:** 相对于**包含块的宽度**的百分比。
    *   `auto`: 由浏览器自动计算。当用于块级元素的 `margin-left` 和 `margin-right` 时，可以实现水平居中 (`margin: 0 auto;`)。
    *   **数学函数:** `calc()`。
*   **示例:** `margin: 16px auto;`

**`margin-top`**, **`margin-right`**, **`margin-bottom`**, **`margin-left`**
*   **描述:** 单独设置某个方向的外边距。
*   **值:**
    *   **`<length>`**, **`<percentage>`**, `auto`, **`calc()`**
*   **示例:** `margin-bottom: 2rem;`

**`border` (简写属性)**
*   **描述:** 同时设置所有四个边框的宽度、样式和颜色。
*   **语法:** `border: <border-width> <border-style> <border-color>`
*   **值:** 见下方单独属性。
*   **示例:** `border: 1px solid #e0e0e0;`

**`border-width`**, **`border-style`**, **`border-color`**
*   **描述:** 分别设置边框的宽度、样式和颜色。可以接受 1-4 个值来为不同边框设置不同样式。
*   **值:**
    *   **`border-width`**:
        *   `<length>`: `1px`, `0.5rem` 等。
        *   关键字: `thin` (细), `medium` (中), `thick` (粗)。
    *   **`border-style`**:
        *   `solid` (实线), `dashed` (虚线), `dotted` (点线), `double` (双线)。
        *   `groove`, `ridge`, `inset`, `outset` (3D 效果)。
        *   `none` (无边框), `hidden` (隐藏边框，与 `none` 类似，但在表格中有特殊行为)。
    *   **`border-color`**:
        *   `<color>`: 任何有效的颜色值，如 `black`, `#333`, `rgba(0,0,0,0.1)`。
        *   `transparent`: 透明边框。
*   **示例:** `border-style: dotted;`, `border-color: red transparent;` (上下为红色，左右为透明)

**`border-top`**, **`border-right`**, **`border-bottom`**, **`border-left`**
*   **描述:** 单独为某个方向的边框设置宽度、样式和颜色。
*   **语法:** `border-top: <width> <style> <color>`
*   **示例:** `border-bottom: 2px solid black;`

**`border-radius`**
*   **描述:** 设置元素边框的圆角。
*   **语法 (1-4 个值):**
    *   `border-radius: value;` (所有角)
    *   `border-radius: top-left-and-bottom-right top-right-and-bottom-left;`
    *   `border-radius: top-left top-right-and-bottom-left bottom-right;`
    *   `border-radius: top-left top-right bottom-right bottom-left;`
    *   可以为每个角提供两个值（用 `/` 分隔）来创建椭圆角，如 `border-radius: 10px / 20px;`。
*   **值:**
    *   **`<length>`**, **`<percentage>`**。`50%` 可以将一个正方形变为圆形。
*   **示例:** `border-radius: 8px;`, `border-radius: 50%;`

**`box-sizing`**
*   **描述:** 定义如何计算一个元素的总宽度和高度。这是现代 CSS 布局中一个极其重要的属性。
*   **值:**
    *   `content-box` (默认值): `width` 和 `height` 只包含内容区的尺寸。`总宽度 = width + padding-left + padding-right + border-left + border-right`。
    *   `border-box`: `width` 和 `height` 包含内容区、内边距和边框。`总宽度 = width`。这使得布局计算更加直观。
*   **示例:** `box-sizing: border-box;` (通常在全局 `*, *::before, *::after` 选择器上设置)

**`outline` (简写属性)**
*   **描述:** 在元素边框之外绘制一条轮廓线。它**不占据空间**，因此不会影响布局。常用于可访问性，如标记焦点状态。
*   **语法:** `outline: <outline-width> <outline-style> <outline-color>`
*   **值:** 与 `border` 类似。
    *   `outline-width`: `<length>`, `thin`, `medium`, `thick`。
    *   `outline-style`: `solid`, `dashed`, `dotted`, `double`, 等，还包括 `auto` (由浏览器决定)。
    *   `outline-color`: `<color>`, 或 `invert` (反色，确保可见性)。
*   **示例:** `outline: 2px solid blue;`

**`outline-offset`**
*   **描述:** 设置轮廓线与元素边框之间的距离。
*   **值:**
    *   **`<length>`:** 可以是正值（向外偏移）或负值（向内偏移）。
*   **示例:** `outline-offset: 4px;`

### **3. 布局与定位 (Layout & Positioning)**

#### **3.1 显示与可见性 (Display & Visibility)**

**`display`**
*   **描述:** 定义元素的显示类型，这决定了其在布局中的行为（是块级还是行内）以及其子元素的布局方式（如 flex 或 grid）。
*   **值 (按类型划分):**
    *   **外部显示类型 (Outer Display Type):** 控制元素自身如何参与流式布局。
        *   `block`: 表现为一个块级元素，前后有换行。
        *   `inline`: 表现为一个行内元素，不产生换行。
        *   `inline-block`: 元素对外表现为行内元素，但其内部可以像块级元素一样设置宽高和内外边距。
    *   **内部显示类型 (Inner Display Type):** 控制元素内部子元素的布局。
        *   `flow` (默认): 子元素使用常规流布局 (块级/行内)。
        *   `flex`: 子元素使用弹性盒子布局 (Flexbox)。
        *   `grid`: 子元素使用网格布局 (Grid)。
    *   **常用组合值:**
        *   `flex`: 等同于 `block flex`。
        *   `inline-flex`: 等同于 `inline flex`。
        *   `grid`: 等同于 `block grid`。
        *   `inline-grid`: 等同于 `inline grid`。
    *   **其他重要值:**
        *   `none`: 元素不被显示，且不占据任何空间（从布局中移除）。
        *   `contents`: 元素自身不产生盒子，其子元素直接成为父元素的子元素。
        *   `table`, `table-row`, `table-cell`, etc.: 使元素表现得像表格元素。
        *   `list-item`: 表现得像 `<li>` 元素。
*   **示例:** `display: flex;`, `display: none;`

**`visibility`**
*   **描述:** 控制元素的可见性。
*   **值:**
    *   `visible` (默认): 元素可见。
    *   `hidden`: 元素不可见，但仍然占据其在布局中的空间。
    *   `collapse`: 主要用于表格行、列。效果类似 `hidden`，但在某些浏览器中可能表现为 `display: none`。
*   **示例:** `visibility: hidden;`

**`opacity`**
*   **描述:** 设置元素的透明度。它会影响元素及其所有子元素。
*   **值:**
    *   **`<number>`:** 从 `0.0` (完全透明) 到 `1.0` (完全不透明) 的数字。
*   **示例:** `opacity: 0.5;`

#### **3.2 定位 (Positioning)**

**`position`**
*   **描述:** 设置元素的定位方案。
*   **值:**
    *   `static` (默认): 元素在常规文档流中。`top`, `right`, `bottom`, `left`, `z-index` 属性无效。
    *   `relative`: 元素相对于其**正常位置**进行定位，但仍在文档流中占据原始空间。
    *   `absolute`: 元素相对于其**最近的非 `static` 定位的祖先元素**进行定位。如果不存在这样的祖先，则相对于初始包含块（通常是 `<html>`）。元素会脱离文档流。
    *   `fixed`: 元素相对于**浏览器视口**进行定位，即使页面滚动，它也保持在同一位置。元素会脱离文档流。
    *   `sticky`: 粘性定位。元素在滚动到特定阈值前表现为 `relative`，之后表现为 `fixed`。
*   **示例:** `position: absolute;`

**`top`**, **`right`**, **`bottom`**, **`left`**
*   **描述:** 当 `position` 不为 `static` 时，用于指定元素的偏移量。
*   **值:**
    *   **`<length>`:** 具体的长度值，可以是负数。
    *   **`<percentage>`:** 相对于包含块的相应尺寸（`top`/`bottom` 相对于高度，`left`/`right` 相对于宽度）。
    *   `auto`: 浏览器自动计算位置。
*   **示例:** `top: 0; left: 50%;`

**`z-index`**
*   **描述:** 控制已定位元素（`position` 不为 `static`）的堆叠顺序。拥有更高 `z-index` 的元素会覆盖更低的。只在同一个堆叠上下文中比较。
*   **值:**
    *   `auto` (默认): 堆叠顺序与其在 HTML 中的顺序相同。
    *   **`<integer>`:** 整数值，可以是正数、负数或 0。
*   **示例:** `z-index: 10;`

#### **3.3 浮动 (Float) - *传统布局***

**`float`**
*   **描述:** 使元素脱离常规文档流，并向左或向右移动，直到其边缘触碰到包含块的边缘或另一个浮动元素的边缘。
*   **值:**
    *   `left`: 向左浮动。
    *   `right`: 向右浮动。
    *   `none` (默认): 不浮动。
*   **示例:** `float: left;`

**`clear`**
*   **描述:** 指定一个元素是否必须移动到浮动元素的下方。常用于清除浮动带来的布局问题。
*   **值:**
    *   `none` (默认): 允许两侧有浮动元素。
    *   `left`: 清除左侧的浮动，元素会被移动到左侧浮动元素的下方。
    *   `right`: 清除右侧的浮动。
    *   `both`: 清除两侧的浮动。
*   **示例:** `clear: both;` (常用于“清除浮动”的 `clearfix` 技巧中)

---

#### **3.4 弹性盒子布局 (Flexbox)**

**容器属性 (Container Properties)**

*   **`display: flex;`** 或 **`display: inline-flex;`** (激活 Flexbox 布局)

*   **`flex-direction`**: 设置主轴方向。
    *   `row` (默认): 水平方向，从左到右。
    *   `row-reverse`: 水平方向，从右到左。
    *   `column`: 垂直方向，从上到下。
    *   `column-reverse`: 垂直方向，从下到上。

*   **`flex-wrap`**: 控制项目是否换行。
    *   `nowrap` (默认): 不换行，项目可能会被压缩。
    *   `wrap`: 换行，第一行在上方。
    *   `wrap-reverse`: 换行，第一行在下方。

*   **`flex-flow`**: `flex-direction` 和 `flex-wrap` 的简写。
    *   **示例:** `flex-flow: row wrap;`

*   **`justify-content`**: 定义项目在**主轴**上的对齐方式。
    *   `flex-start` (默认): 对齐主轴起点。
    *   `flex-end`: 对齐主轴终点。
    *   `center`: 居中对齐。
    *   `space-between`: 两端对齐，项目之间的间隔都相等。
    *   `space-around`: 每个项目两侧的间隔相等，所以项目之间的间隔比项目与边框的间隔大一倍。
    *   `space-evenly`: 所有间隔都相等，包括项目与边框之间的间隔。

*   **`align-items`**: 定义项目在**交叉轴**上的对齐方式。
    *   `stretch` (默认): 如果项目未设置高度（或宽度，取决于主轴），将占满整个容器的高度（或宽度）。
    *   `flex-start`: 对齐交叉轴起点。
    *   `flex-end`: 对齐交叉轴终点。
    *   `center`: 居中对齐。
    *   `baseline`: 项目的第一行文字的基线对齐。

*   **`align-content`**: 定义多根轴线（当 `flex-wrap: wrap` 时）的对齐方式。
    *   `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`, `stretch` (默认)。

**项目属性 (Item Properties)**

*   **`order`**: 定义项目的排列顺序。
    *   **`<integer>`:** 默认值为 `0`。数值越小，排列越靠前。
    *   **示例:** `order: -1;`

*   **`flex-grow`**: 定义项目的放大比例。
    *   **`<number>`:** 默认值为 `0`，表示不放大。如果所有项目 `flex-grow` 都为 `1`，则它们将平分剩余空间。
    *   **示例:** `flex-grow: 1;`

*   **`flex-shrink`**: 定义项目的缩小比例。
    *   **`<number>`:** 默认值为 `1`，表示空间不足时项目将缩小。`0` 表示不缩小。
    *   **示例:** `flex-shrink: 0;`

*   **`flex-basis`**: 定义项目在分配多余空间前的默认大小。
    *   **`<length>`, `<percentage>`:** 如 `200px`。
    *   `auto` (默认): 项目的原始大小。
    *   `content`: 基于内容的尺寸。
    *   **示例:** `flex-basis: 100px;`

*   **`flex`**: `flex-grow`, `flex-shrink`, `flex-basis` 的简写。
    *   **关键字:** `initial` (`0 1 auto`), `auto` (`1 1 auto`), `none` (`0 0 auto`)。
    *   **单值:**
        *   一个无单位数字: `flex: 2;` (即 `2 1 0%`)
        *   一个长度或百分比: `flex: 10em;` (即 `1 1 10em`)
    *   **双值:**
        *   `flex: 1 30px;` (即 `1 1 30px`)
    *   **三值:**
        *   `flex: 2 2 10%;`
    *   **示例:** `flex: 1;` (最常用，表示项目等分剩余空间)

*   **`align-self`**: 允许单个项目有与其它项目不同的 `align-items` 属性。
    *   `auto` (默认): 继承父容器的 `align-items`。
    *   `flex-start`, `flex-end`, `center`, `baseline`, `stretch`。
    *   **示例:** `align-self: center;`

---

#### **3.5 网格布局 (Grid)**

**由于 Grid 属性非常多，这里只列出关键属性及其常用值。**

**容器属性 (Container Properties)**

*   **`display: grid;`** 或 **`display: inline-grid;`** (激活 Grid 布局)

*   **`grid-template-columns`** / **`grid-template-rows`**: 定义网格的列和行。
    *   **`<length>`, `<percentage>`:** `grid-template-columns: 200px 1fr 2fr;`
    *   `fr` 单位: 代表网格容器中可用空间的一等份。
    *   `repeat()` 函数: `repeat(3, 1fr)` (重复 3 次 `1fr`)。
    *   `minmax()` 函数: `minmax(100px, 1fr)` (最小 100px，最大 1fr)。
    *   `auto`: 由内容决定大小。
    *   `fit-content()`, `min-content()`, `max-content()`。

*   **`gap`** (或 `grid-gap`): 定义网格线之间的间距。
    *   `gap: <row-gap> <column-gap>;`
    *   **值:** `<length>`, `<percentage>`
    *   **示例:** `gap: 1rem;`

*   **`justify-items`** / **`align-items`**: 定义单元格内容在网格区域内的水平/垂直对齐。
    *   `start`, `end`, `center`, `stretch` (默认)。

*   **`place-items`**: `align-items` 和 `justify-items` 的简写。`place-items: center;`

*   **`justify-content`** / **`align-content`**: 定义整个网格在容器内的对齐方式（当网格总大小小于容器时）。
    *   `start`, `end`, `center`, `space-between`, `space-around`, `space-evenly`。

**项目属性 (Item Properties)**

*   **`grid-column-start`** / **`grid-column-end`** / **`grid-row-start`** / **`grid-row-end`**: 定义项目所占的网格线。
    *   **`<integer>`:** 网格线编号。
    *   `span <number>`: 跨越指定数量的轨道。
    *   **示例:** `grid-column-start: 1; grid-column-end: 3;` (从第1条线到第3条线)

*   **`grid-column`** / **`grid-row`**: 上述属性的简写。
    *   **语法:** `<start-line> / <end-line>` 或 `<start-line> / span <number>`
    *   **示例:** `grid-column: 1 / 3;` 或 `grid-column: span 2;`

*   **`grid-area`**: 可以是 `grid-row-start` / `grid-column-start` / `grid-row-end` / `grid-column-end` 的简写，或用于指定 `grid-template-areas` 中定义的区域名。
    *   **示例:** `grid-area: header;`

*   **`justify-self`** / **`align-self`**: 定义单个项目覆盖容器的 `justify-items`/`align-items`。
    *   `start`, `end`, `center`, `stretch`。

### **4. 背景与装饰 (Background & Decoration)**

**`background-color`**
*   **描述:** 设置元素的背景颜色。
*   **值:**
    *   **`<color>`:** 所有有效的颜色表示法，如：
        *   关键字: `red`, `blue`, `transparent` (透明)。
        *   HEX: `#ff0000`, `#f00`。
        *   RGB/RGBA: `rgb(255, 0, 0)`, `rgba(255, 0, 0, 0.5)`。
        *   HSL/HSLA: `hsl(0, 100%, 50%)`, `hsla(0, 100%, 50%, 0.5)`。
    *   `currentcolor`: 使用元素当前的 `color` 属性值。
*   **示例:** `background-color: #f8f9fa;`

**`background-image`**
*   **描述:** 为元素设置一个或多个背景图像。多个图像用逗号分隔，第一个图像在最上层。
*   **值:**
    *   `none` (默认): 无背景图像。
    *   **`<image>`:**
        *   `url()`: 指向一个图像文件的路径，如 `url('path/to/image.jpg')`。
        *   **渐变函数 (Gradients):**
            *   `linear-gradient()`: 线性渐变。
                *   **示例:** `linear-gradient(to right, red, blue);`, `linear-gradient(45deg, #ff0, #f00);`
            *   `radial-gradient()`: 径向渐变。
                *   **示例:** `radial-gradient(circle, white, black);`
            *   `repeating-linear-gradient()` 和 `repeating-radial-gradient()`: 重复渐变。
            *   `conic-gradient()`: 锥形渐变。
*   **示例:** `background-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent), url('hero.jpg');`

**`background-repeat`**
*   **描述:** 控制背景图像如何重复。
*   **值:**
    *   `repeat` (默认): 在水平和垂直方向上平铺。
    *   `repeat-x`: 仅在水平方向上平铺。
    *   `repeat-y`: 仅在垂直方向上平铺。
    *   `no-repeat`: 不平铺，图像只显示一次。
    *   `space`: 图像会重复以填满空间，但不会被裁剪，图像间会有均匀的空白。
    *   `round`: 图像会重复以填满空间，可能会被拉伸或压缩以适应。
*   **示例:** `background-repeat: no-repeat;`

**`background-position`**
*   **描述:** 设置背景图像的起始位置。
*   **值:**
    *   **关键字:** `top`, `bottom`, `left`, `right`, `center`。可以组合使用，如 `top right`。
    *   **`<length>`:** 如 `50px 100px` (x y)。
    *   **`<percentage>`:** 如 `25% 75%` (x y)。`50% 50%` 等同于 `center center`。
*   **示例:** `background-position: center center;`

**`background-size`**
*   **描述:** 设置背景图像的尺寸。
*   **值:**
    *   `auto` (默认): 图像的原始尺寸。
    *   **`<length>`:** 如 `200px 100px` (width height)。如果只提供一个值，第二个值默认为 `auto`。
    *   **`<percentage>`:** 相对于背景定位区域的百分比。
    *   `cover`: 缩放图像以完全覆盖背景区域，可能会裁剪图像。
    *   `contain`: 缩放图像以使其在背景区域内完整显示，可能会留有空白。
*   **示例:** `background-size: cover;`

**`background-attachment`**
*   **描述:** 控制背景图像是否随页面其余部分滚动。
*   **值:**
    *   `scroll` (默认): 背景图像随元素内容滚动。
    *   `fixed`: 背景图像相对于视口固定，不随页面滚动（常用于视差效果）。
    *   `local`: 背景图像随元素内容滚动，但如果元素本身有滚动条，背景也会随之滚动。
*   **示例:** `background-attachment: fixed;`

**`background-origin`**
*   **描述:** 指定 `background-position` 属性是相对于哪个区域进行定位的。
*   **值:**
    *   `padding-box` (默认): 相对于内边距框。
    *   `border-box`: 相对于边框。
    *   `content-box`: 相对于内容区。
*   **示例:** `background-origin: content-box;`

**`background-clip`**
*   **描述:** 定义背景（颜色或图像）的绘制区域。
*   **值:**
    *   `border-box` (默认): 背景绘制到边框外沿。
    *   `padding-box`: 背景绘制到内边距外沿。
    *   `content-box`: 背景只绘制在内容区。
    *   `text`: 背景被裁剪成文字的前景色（通常需要设置 `color: transparent`）。
*   **示例:** `background-clip: text;`

**`background` (简写属性)**
*   **描述:** 在一个声明中设置所有背景属性。
*   **语法:** 值的顺序可以比较灵活，但通常建议按 `color image repeat attachment position / size origin clip` 的顺序。
*   **示例:** `background: #f00 url('img.png') no-repeat right top / 50px 50px;`

**`box-shadow`**
*   **描述:** 为元素盒子添加一个或多个阴影。多个阴影用逗号分隔。
*   **语法:** `[inset] [x-offset] [y-offset] [blur-radius] [spread-radius] [color]`
*   **值:**
    *   `inset` (可选): 将外部阴影变为内部阴影。
    *   `x-offset`: `<length>` 水平偏移量。
    *   `y-offset`: `<length>` 垂直偏移量。
    *   `blur-radius` (可选): `<length>` 模糊半径。
    *   `spread-radius` (可选): `<length>` 扩展半径。正值使阴影扩大，负值使阴影缩小。
    *   `color` (可选): `<color>` 阴影颜色。
*   **示例:** `box-shadow: 0 4px 8px rgba(0,0,0,0.1), inset 0 2px 3px rgba(255,255,255,0.5);`

**`filter`**
*   **描述:** 对元素应用图形效果，如模糊、亮度、对比度等。
*   **值:**
    *   `none` (默认): 无滤镜。
    *   **滤镜函数:**
        *   `blur(<length>)`: 高斯模糊。`filter: blur(5px);`
        *   `brightness(<number> | <percentage>)`: 亮度。`1` 或 `100%` 是原样。`filter: brightness(1.5);`
        *   `contrast(<number> | <percentage>)`: 对比度。`1` 或 `100%` 是原样。`filter: contrast(200%);`
        *   `grayscale(<number> | <percentage>)`: 灰度。`1` 或 `100%` 是完全灰度。`filter: grayscale(1);`
        *   `hue-rotate(<angle>)`: 色相旋转。`filter: hue-rotate(90deg);`
        *   `invert(<number> | <percentage>)`: 反相。`filter: invert(100%);`
        *   `opacity(<number> | <percentage>)`: 透明度。`filter: opacity(50%);`
        *   `saturate(<number> | <percentage>)`: 饱和度。`filter: saturate(2);`
        *   `sepia(<number> | <percentage>)`: 褐色。`filter: sepia(1);`
        *   `drop-shadow(...)`: 应用一个类似 `box-shadow` 的投影，但它会考虑到内容的形状（包括透明部分）。语法与 `text-shadow` 类似。
    *   可以组合多个滤镜函数，用空格分隔。
*   **示例:** `filter: grayscale(1) blur(2px);`

**`mix-blend-mode`**
*   **描述:** 定义元素的内容应该如何与其**下方**的内容（父元素的背景）进行混合。
*   **值:**
    *   `normal` (默认): 正常。
    *   **混合模式:** `multiply` (正片叠底), `screen` (滤色), `overlay` (叠加), `darken`, `lighten`, `color-dodge`, `color-burn`, `difference`, `exclusion`, `hue`, `saturation`, `color`, `luminosity`。
*   **示例:** `mix-blend-mode: screen;`

**`background-blend-mode`**
*   **描述:** 定义元素的多个背景层（`background-image`）之间如何混合。
*   **值:** 与 `mix-blend-mode` 相同。
*   **示例:** `background-blend-mode: multiply;`

**`clip-path`**
*   **描述:** 使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。
*   **值:**
    *   `none` (默认): 无裁剪。
    *   `url()`: 引用一个 SVG `<clipPath>` 元素。
    *   **基本形状函数:**
        *   `inset()`: 定义一个矩形裁剪区域。
        *   `circle()`: 定义一个圆形。`circle(50% at center)`
        *   `ellipse()`: 定义一个椭圆。
        *   `polygon()`: 定义一个多边形，通过一系列坐标点。`polygon(50% 0, 100% 100%, 0 100%)` (三角形)
*   **示例:** `clip-path: circle(50%);`


### **5. 动画、过渡与变形 (Animation, Transition & Transform)**

#### **5.1 过渡 (Transitions)**

过渡（Transition）用于在 CSS 属性值发生变化时，提供一个平滑的动画效果，而不是瞬间改变。

**`transition-property`**
*   **描述:** 指定要应用过渡效果的 CSS 属性的名称。
*   **值:**
    *   `none`: 没有属性会获得过渡效果。
    *   `all` (默认): 所有可动画的属性都将应用过渡。
    *   **`<custom-ident>`:** 一个或多个用逗号分隔的 CSS 属性名，如 `width`, `background-color`, `transform`。
*   **示例:** `transition-property: opacity, transform;`

**`transition-duration`**
*   **描述:** 指定过渡效果完成所需的时间。
*   **值:**
    *   **`<time>`:** 时间单位，如 `s` (秒) 或 `ms` (毫秒)。`0s` 表示没有过渡效果。
*   **示例:** `transition-duration: 0.3s;`

**`transition-timing-function`**
*   **描述:** 指定过渡效果的速度曲线，即过渡期间的变化速率。
*   **值:**
    *   **关键字:**
        *   `ease` (默认): 慢速开始，然后变快，然后慢速结束。
        *   `linear`: 匀速。
        *   `ease-in`: 慢速开始。
        *   `ease-out`: 慢速结束。
        *   `ease-in-out`: 慢速开始和结束。
    *   **函数:**
        *   `cubic-bezier(n, n, n, n)`: 自定义贝塞尔曲线。
        *   `steps(n, <jumpterm>)`: 分步动画。`jumpterm` 可以是 `jump-start`, `jump-end`, `jump-none`, `jump-both`。
*   **示例:** `transition-timing-function: ease-in-out;`

**`transition-delay`**
*   **描述:** 指定在属性值改变后，过渡效果延迟多久开始。
*   **值:**
    *   **`<time>`:** 时间单位，可以是正值（延迟）或负值（提前开始）。
*   **示例:** `transition-delay: 100ms;`

**`transition` (简写属性)**
*   **描述:** 在一个声明中设置所有四个过渡属性。
*   **语法:** `transition: [property] [duration] [timing-function] [delay]`
*   **注意:** 如果为多个属性设置不同的过渡，可以用逗号分隔。
*   **示例:** `transition: background-color 0.5s ease, transform 0.3s ease-out 0.1s;`
*   **常用简写:** `transition: all 0.3s ease;`

#### **5.2 动画 (Animations)**

动画（Animation）通过 `@keyframes` 规则定义更复杂的、可循环的动画序列。

**`animation-name`**
*   **描述:** 指定要应用的 `@keyframes` 动画的名称。
*   **值:**
    *   `none` (默认): 无动画。
    *   **`<custom-ident>`:** 在 `@keyframes` 规则中定义的名称。
*   **示例:** `animation-name: slide-in;`

**`animation-duration`**
*   **描述:** 指定动画完成一个周期所需的时间。
*   **值:**
    *   **`<time>`:** 时间单位。
*   **示例:** `animation-duration: 2s;`

**`animation-timing-function`**
*   **描述:** 指定动画的速度曲线。
*   **值:** 与 `transition-timing-function` 相同 (`ease`, `linear`, `cubic-bezier()`, `steps()`, etc.)。
*   **示例:** `animation-timing-function: linear;`

**`animation-delay`**
*   **描述:** 指定动画在应用到元素上后延迟多久开始。
*   **值:**
    *   **`<time>`:** 时间单位。
*   **示例:** `animation-delay: 0.5s;`

**`animation-iteration-count`**
*   **描述:** 指定动画应播放的次数。
*   **值:**
    *   **`<number>`:** 播放次数，如 `3`。
    *   `infinite`: 无限次循环播放。
*   **示例:** `animation-iteration-count: infinite;`

**`animation-direction`**
*   **描述:** 指定动画是否应该在每个周期中轮流反向播放。
*   **值:**
    *   `normal` (默认): 每个周期都从头到尾播放。
    *   `reverse`: 每个周期都从尾到头反向播放。
    *   `alternate`: 奇数次从头到尾，偶数次从尾到头。
    *   `alternate-reverse`: 奇数次从尾到头，偶数次从头到尾。
*   **示例:** `animation-direction: alternate;`

**`animation-fill-mode`**
*   **描述:** 指定动画在非播放时间（开始前、结束后或两者）如何应用样式到其目标。
*   **值:**
    *   `none` (默认): 动画在播放前后不应用任何样式。
    *   `forwards`: 动画结束后，元素将保持最后一个关键帧的样式。
    *   `backwards`: 动画开始前（在 `animation-delay` 期间），元素将应用第一个关键帧的样式。
    *   `both`: 同时应用 `forwards` 和 `backwards` 的规则。
*   **示例:** `animation-fill-mode: forwards;`

**`animation-play-state`**
*   **描述:** 指定动画是正在运行还是暂停。
*   **值:**
    *   `running` (默认): 动画正在播放。
    *   `paused`: 动画已暂停。
*   **示例:** `animation-play-state: paused;`

**`animation` (简写属性)**
*   **描述:** 在一个声明中设置所有动画属性。
*   **语法:** `animation: [name] [duration] [timing-function] [delay] [iteration-count] [direction] [fill-mode] [play-state]`
*   **示例:** `animation: slide-in 1s ease-out forwards;`

**`@keyframes` 规则**
*   **描述:** 定义动画序列中的关键帧（或断点）。
*   **语法:**
    ```css
    @keyframes animation-name {
      from { /* CSS 样式 */ }
      to { /* CSS 样式 */ }
    }
    /* 或者使用百分比 */
    @keyframes animation-name {
      0% { /* CSS 样式 */ }
      50% { /* CSS 样式 */ }
      100% { /* CSS 样式 */ }
    }
    ```
*   **示例:**
    ```css
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    ```

#### **5.3 变形 (Transforms)**

变形（Transform）用于移动、旋转、缩放和倾斜元素，而不会影响周围元素的布局。

**`transform`**
*   **描述:** 对元素应用一个或多个 2D 或 3D 转换。多个转换函数用空格分隔。
*   **值:**
    *   `none` (默认): 无变形。
    *   **2D 转换函数:**
        *   `translate(x, y)`: 平移。`translateX(x)`, `translateY(y)`。值可以是 `<length>` 或 `<percentage>`。
        *   `scale(x, y)`: 缩放。`scaleX(x)`, `scaleY(y)`。值为 `<number>`。
        *   `rotate(angle)`: 旋转。值为 `<angle>`，如 `45deg`。
        *   `skew(x-angle, y-angle)`: 倾斜。`skewX(angle)`, `skewY(angle)`。
        *   `matrix(...)`: 使用 2D 变换矩阵直接定义。
    *   **3D 转换函数:**
        *   `translate3d(x, y, z)`: 3D 平移。`translateZ(z)`。
        *   `scale3d(x, y, z)`: 3D 缩放。`scaleZ(z)`。
        *   `rotate3d(x, y, z, angle)`: 沿自定义轴旋转。`rotateX(angle)`, `rotateY(angle)`, `rotateZ(angle)`。
        *   `perspective(length)`: 为单个元素设置透视距离。
        *   `matrix3d(...)`: 使用 3D 变换矩阵直接定义。
*   **示例:** `transform: translateX(50px) rotate(10deg) scale(1.2);`

**`transform-origin`**
*   **描述:** 设置转换操作的中心点。
*   **值:**
    *   默认为 `50% 50%` 或 `center center`。
    *   可以接受 1-3 个值 (x-offset y-offset z-offset)。
    *   **关键字:** `left`, `center`, `right`, `top`, `bottom`。
    *   **`<length>`**, **`<percentage>`**。
*   **示例:** `transform-origin: top left;`

**`transform-style`**
*   **描述:** 指定嵌套元素如何在 3D 空间中呈现。
*   **值:**
    *   `flat` (默认): 子元素不享有自己的 3D 空间。
    *   `preserve-3d`: 子元素位于父元素的 3D 空间中，允许创建更复杂的 3D 结构。
*   **示例:** `transform-style: preserve-3d;`

**`perspective`**
*   **描述:** 为 3D 定位元素设置透视效果。此属性**应用于容器元素**，影响其所有子元素。
*   **值:**
    *   `none` (默认): 无透视。
    *   **`<length>`:** 观察者与 z=0 平面之间的距离。值越小，透视效果越强烈。
*   **示例:** `perspective: 1000px;`

**`backface-visibility`**
*   **描述:** 定义当元素的背面（在 3D 转换后）朝向观察者时是否可见。
*   **值:**
    *   `visible` (默认): 背面可见。
    *   `hidden`: 背面不可见。
*   **示例:** `backface-visibility: hidden;`

### **6. 用户界面与交互 (User Interface & Interaction)**

**`cursor`**
*   **描述:** 设置当鼠标指针悬停在元素上时显示的光标（鼠标指针）类型。
*   **值:**
    *   **关键字:**
        *   `auto` (默认): 浏览器根据上下文决定。
        *   `default`: 平台默认光标（通常是箭头）。
        *   `pointer`: 手型，表示可点击链接。
        *   `text`: I 型，表示可选中文本。
        *   `wait`: 等待状态（通常是沙漏或旋转图标）。
        *   `help`: 帮助状态（通常是问号）。
        *   `move`: 可移动。
        *   `not-allowed`: 禁止。
        *   `grab`: 可抓取。
        *   `grabbing`: 正在抓取。
        *   `crosshair`: 十字线。
        *   **缩放:** `zoom-in`, `zoom-out`。
        *   **调整大小:** `n-resize`, `e-resize`, `s-resize`, `w-resize` (上右下左) 以及它们的组合 `ne-resize`, `nw-resize`, `se-resize`, `sw-resize`。
    *   `url()`: 使用自定义图像作为光标。可以提供备选关键字。
*   **示例:** `cursor: pointer;`, `cursor: url('custom.cur'), auto;`

**`pointer-events`**
*   **描述:** 定义元素是否可以成为鼠标事件（如点击、悬停）的目标。
*   **值:**
    *   `auto` (默认): 与 `visiblePainted` 效果相同（对于 SVG）。
    *   `none`: 元素完全忽略鼠标事件，事件会“穿透”到其下方的元素。
*   **示例:** `pointer-events: none;`

**`user-select`**
*   **描述:** 控制用户是否能够选择元素中的文本。
*   **值:**
    *   `auto` (默认): 浏览器决定，通常文本元素可选。
    *   `text`: 用户可以选择文本。
    *   `none`: 用户不能选择文本。
    *   `all`: 当在一个元素上开始选择时，会选中该元素的所有内容。
*   **示例:** `user-select: none;`

**`resize`**
*   **描述:** 控制用户是否可以调整元素的尺寸。通常只对 `overflow` 不为 `visible` 的元素有效。
*   **值:**
    *   `none` (默认): 不可调整。
    *   `both`: 水平和垂直方向均可调整。
    *   `horizontal`: 仅水平方向可调。
    *   `vertical`: 仅垂直方向可调。
*   **示例:** `resize: vertical;` (常用于 `<textarea>`)

**`scroll-behavior`**
*   **描述:** 当通过导航或 CSSOM API 触发滚动时，控制滚动框的滚动行为。
*   **值:**
    *   `auto` (默认): 滚动立即发生。
    *   `smooth`: 滚动是平滑的动画。
*   **示例:** `html { scroll-behavior: smooth; }`

**`overflow`**, **`overflow-x`**, **`overflow-y`**
*   **描述:** 控制当内容溢出元素框时如何处理。`overflow` 是 `overflow-x` 和 `overflow-y` 的简写。
*   **值:**
    *   `visible` (默认): 内容不会被裁剪，会呈现在元素框之外。
    *   `hidden`: 内容被裁剪，且不提供滚动条。
    *   `scroll`: 内容被裁剪，且总是显示滚动条（即使内容没有溢出）。
    *   `auto`: 内容被裁剪，仅在内容溢出时显示滚动条。
    *   `clip`: 类似于 `hidden`，但性能更好，因为它禁止所有滚动。
*   **示例:** `overflow-y: auto;`

**`accent-color`**
*   **描述:** 为某些表单控件（如复选框 `checkbox`、单选按钮 `radio`、范围滑块 `range`、进度条 `progress`）设置强调色。
*   **值:**
    *   `auto` (默认): 浏览器默认颜色。
    *   **`<color>`:** 任何有效的颜色值。
*   **示例:** `input[type="checkbox"] { accent-color: hotpink; }`

**`appearance`**
*   **描述:** 移除或改变元素的平台原生样式，使其可以被 CSS 更自由地定制。
*   **值:**
    *   `none`: 移除元素的原生外观。
    *   `auto` (默认): 元素呈现其原生外观。
*   **示例:** `select { appearance: none; }`

---

### **7. 特定元素样式 (Specific Element Styling)**

#### **7.1 列表 (Lists)**

**`list-style-type`**
*   **描述:** 设置列表项标记（项目符号或编号）的类型。
*   **值:**
    *   `none`: 无标记。
    *   **符号:** `disc` (实心圆, 默认), `circle` (空心圆), `square` (实心方块)。
    *   **编号:**
        *   `decimal` (1, 2, 3...)
        *   `decimal-leading-zero` (01, 02, 03...)
        *   `lower-roman` (i, ii, iii...)
        *   `upper-roman` (I, II, III...)
        *   `lower-alpha` / `lower-latin` (a, b, c...)
        *   `upper-alpha` / `upper-latin` (A, B, C...)
    *   **其他语言/脚本:** `cjk-decimal`, `hebrew`, `armenian`, 等等。
*   **示例:** `list-style-type: square;`

**`list-style-position`**
*   **描述:** 设置列表项标记是在内容内部还是外部。
*   **值:**
    *   `outside` (默认): 标记位于文本块之外。
    *   `inside`: 标记位于文本块之内，如同第一个字母。
*   **示例:** `list-style-position: inside;`

**`list-style-image`**
*   **描述:** 使用图像作为列表项的标记。
*   **值:**
    *   `none` (默认): 不使用图像。
    *   `url()`: 指向一个图像文件的路径。
*   **示例:** `list-style-image: url('star.svg');`

**`list-style` (简写属性)**
*   **描述:** 在一个声明中设置所有列表样式属性。
*   **语法:** `list-style: [type] [position] [image]`
*   **示例:** `list-style: circle inside;`

#### **7.2 表格 (Tables)**

**`border-collapse`**
*   **描述:** 控制表格的边框是合并为单一边框还是各自独立。
*   **值:**
    *   `separate` (默认): 边框分离。
    *   `collapse`: 相邻单元格的边框合并。
*   **示例:** `table { border-collapse: collapse; }`

**`border-spacing`**
*   **描述:** 当 `border-collapse` 为 `separate` 时，设置相邻单元格边框之间的距离。
*   **值:**
    *   **`<length>`:** 一个值表示水平和垂直间距，两个值分别表示水平和垂直间距。
*   **示例:** `border-spacing: 5px 10px;`

**`caption-side`**
*   **描述:** 设置表格标题 (`<caption>` 元素) 的位置。
*   **值:**
    *   `top` (默认): 标题在表格上方。
    *   `bottom`: 标题在表格下方。
*   **示例:** `caption-side: bottom;`

**`empty-cells`**
*   **描述:** 控制在 `border-collapse: separate` 模式下，是否显示空单元格（没有可见内容）的边框和背景。
*   **值:**
    *   `show` (默认): 显示。
    *   `hide`: 不显示。
*   **示例:** `empty-cells: hide;`

**`table-layout`**
*   **描述:** 定义用于布局表格单元格、行和列的算法。
*   **值:**
    *   `auto` (默认): 列宽由其内容决定。
    *   `fixed`: 列宽由表格的宽度和列的宽度决定，而不是内容。这通常会使表格渲染得更快。
*   **示例:** `table { table-layout: fixed; }`

#### **7.3 生成内容 (Generated Content)**

这些属性通常与 `::before` 和 `::after` 伪元素一起使用。

**`content`**
*   **描述:** 在元素的前面或后面插入生成的内容。
*   **值:**
    *   `normal` / `none`: 不生成任何内容。
    *   **`<string>`:** 文本字符串，如 `"Note: "`。
    *   `url()`: 插入外部资源，如图像。
    *   **计数器:** `counter()` 或 `counters()`。
    *   **引号:** `open-quote`, `close-quote`, `no-open-quote`, `no-close-quote`。
    *   `attr(attribute-name)`: 获取元素的某个属性值。
*   **示例:** `a::after { content: " (" attr(href) ")"; }`

**`counter-reset`** / **`counter-increment`**
*   **描述:**
    *   `counter-reset`: 在一个元素上创建或重置一个或多个 CSS 计数器。
    *   `counter-increment`: 增加一个或多个 CSS 计数器的值。
*   **值:**
    *   **`<custom-ident>`:** 计数器的名称。可以附带一个可选的 `<integer>` 来指定重置/递增的值。
*   **示例:**
    ```css
    body { counter-reset: section; }
    h2 { counter-increment: section; }
    h2::before { content: "Section " counter(section) ": "; }
    ```

### **8. 其他与高级属性 (Miscellaneous & Advanced)**

#### **8.1 CSS 变量 (Custom Properties for Cascading Variables)**

CSS 变量允许你在样式表中声明可复用的值。

**声明自定义属性**
*   **语法:** `--<custom-property-name>: <value>;`
*   **描述:** 属性名必须以两个连字符 (`--`) 开头。它通常在 `:root` 伪类（代表 `<html>` 元素）上声明，以便全局可用。
*   **值:** 几乎可以是任何有效的 CSS 值。
*   **示例:**
    ```css
    :root {
      --primary-color: #3498db;
      --base-font-size: 16px;
      --main-spacing: 1rem;
    }
    ```

**使用自定义属性 `var()` 函数**
*   **语法:** `var(--<custom-property-name> [, <declaration-value>])`
*   **描述:** 用于在其他 CSS 属性中引用自定义属性的值。
*   **值:**
    *   第一个参数是自定义属性的名称。
    *   第二个参数是可选的**备用值 (fallback value)**，如果第一个参数引用的变量无效或未定义，则使用该值。
*   **示例:**
    ```css
    a {
      color: var(--primary-color, blue); /* 如果 --primary-color 未定义，则使用 blue */
    }
    .container {
      padding: var(--main-spacing);
    }
    ```

#### **8.2 计算值 `calc()` 函数**

**`calc()`**
*   **描述:** 允许在 CSS 属性值中执行数学计算。它可以在不同单位之间进行运算。
*   **语法:** `calc(<expression>)`
*   **值:**
    *   表达式可以使用 `+`、`-`、`*`、`/` 运算符。
    *   **注意:** `+` 和 `-` 运算符两边必须有空格。`*` 和 `/` 两侧的空格是可选的，但建议保留以提高可读性。
*   **示例:**
    *   `width: calc(100% - 80px);`
    *   `font-size: calc(1rem + 0.5vw);`
    *   `left: calc(50% - (100px / 2));`

#### **8.3 逻辑属性与值 (Logical Properties and Values)**

逻辑属性提供了一种基于**书写模式 (writing mode)**、**方向 (direction)** 和**文本方向**来定义布局的方式，而不是基于物理方向（上/下/左/右）。这对于国际化和多语言网站尤其重要。

*   **块轴 (Block Axis):** 文本流动的方向（如水平书写中的垂直方向）。
*   **行内轴 (Inline Axis):** 文本书写的方向（如水平书写中的水平方向）。

**常用逻辑属性 (部分列表):**

| 物理属性 (Physical)   | 逻辑属性 (Logical)             | 描述                                     |
| --------------------- | -------------------------------- | ---------------------------------------- |
| `width`               | `inline-size`                    | 行内轴方向的尺寸                         |
| `height`              | `block-size`                     | 块轴方向的尺寸                           |
| `min-width`           | `min-inline-size`                | 最小行内尺寸                             |
| `min-height`          | `min-block-size`                 | 最小块尺寸                               |
| `margin-left`         | `margin-inline-start`            | 行内轴开始方向的外边距                   |
| `margin-right`        | `margin-inline-end`              | 行内轴结束方向的外边距                   |
| `margin-top`          | `margin-block-start`             | 块轴开始方向的外边距                     |
| `margin-bottom`       | `margin-block-end`               | 块轴结束方向的外边距                     |
| `padding-left`        | `padding-inline-start`           | 行内轴开始方向的内边距                   |
| `padding-right`       | `padding-inline-end`             | 行内轴结束方向的内边距                   |
| `border-left`         | `border-inline-start`            | 行内轴开始方向的边框                     |
| `border-right`        | `border-inline-end`              | 行内轴结束方向的边框                     |
| `top` / `bottom` / `left` / `right` | `inset` (简写) / `inset-block-start` / `inset-inline-end` 等 | 逻辑偏移量 |

*   **值:** 这些逻辑属性接受与它们对应的物理属性相同类型的值（`<length>`, `<percentage>`, `auto` 等）。
*   **示例:**
    ```css
    .element {
      /* 在 ltr (从左到右) 书写模式下，等同于 margin-left */
      margin-inline-start: 1rem;
      
      /* 在 ltr 书写模式下，等同于 padding-top 和 padding-bottom */
      padding-block: 0.5rem;
    }
    ```

#### **8.4 遮罩与形状 (Masking & Shapes)**

**`mask` 系列属性 (简写)**
*   **描述:** 使用图像或渐变作为遮罩层来隐藏或显示元素的部分区域。与 `background` 类似，它是一系列属性的简写。
*   **值 (部分):**
    *   `mask-image`: `url()`, 渐变函数。
    *   `mask-repeat`: `repeat`, `no-repeat`, `space`, `round`。
    *   `mask-position`: `center`, `<length>`, `<percentage>`。
    *   `mask-size`: `auto`, `cover`, `contain`。
    *   `mask-mode`: `alpha` (使用透明度), `luminance` (使用亮度)。
*   **示例:** `mask-image: linear-gradient(to top, transparent, black);`

**`shape-outside`**
*   **描述:** 定义一个几何形状，使内联内容（如文本）可以环绕它。此属性必须应用于浮动元素。
*   **值:**
    *   `none`: 无形状。
    *   **`<shape-box>`:** `margin-box`, `border-box`, `padding-box`, `content-box`。
    *   **基本形状函数:** `inset()`, `circle()`, `ellipse()`, `polygon()`。
    *   `url()`: 从图像的 Alpha 通道中提取形状。
*   **示例:** `shape-outside: circle(50%);`

**`shape-margin`**
*   **描述:** 为 `shape-outside` 定义的形状设置外边距，使环绕的内容与形状之间保持一定距离。
*   **值:**
    *   **`<length>`**, **`<percentage>`**。
*   **示例:** `shape-margin: 1rem;`

#### **8.5 重要的 `@` 规则 (`@` Rules)**

虽然 `@` 规则不是属性，但它们是 CSS 语法的核心部分，用于定义样式应用条件或引入外部资源。

**`@import`**
*   **描述:** 用于从其他样式表中导入样式规则。**必须**位于样式表的顶端（在任何 CSS 规则之前）。
*   **语法:** `@import url("path/to/stylesheet.css");`
*   **注意:** 使用 `<link>` 标签在 HTML 中引入 CSS 通常比 `@import` 性能更好，因为它可以并行加载。

**`@media` (媒体查询)**
*   **描述:** 根据一个或多个媒体特性（如视口宽度、屏幕分辨率、设备方向）的值来应用不同的样式规则。这是响应式设计的核心。
*   **语法:** `@media <media-type> and (<media-feature>:<value>) { /* CSS 规则 */ }`
*   **示例:**
    ```css
    /* 当视口宽度小于等于 600px 时应用 */
    @media (max-width: 600px) {
      .container {
        flex-direction: column;
      }
    }
    ```

**`@supports` (特性查询)**
*   **描述:** 根据浏览器是否支持某个 CSS 属性-值对来应用样式规则。用于渐进增强。
*   **语法:** `@supports (<declaration>) { /* CSS 规则 */ }`
*   **示例:**
    ```css
    /* 如果浏览器支持 display: grid */
    @supports (display: grid) {
      div {
        display: grid;
      }
    }
    ```

**`@layer` (级联层)**
*   **描述:** 允许开发者显式地声明 CSS 规则的级联层，从而更精细地控制样式优先级，避免复杂的选择器和 `!important`。
*   **语法:** `@layer <layer-name> { /* CSS 规则 */ }` 或 `@layer <layer-name1>, <layer-name2>;`
*   **示例:**
    ```css
    @layer reset, base, components, utilities;
    
    @layer reset { /* 重置样式 */ }
    @layer components { /* 组件样式 */ }
    ```

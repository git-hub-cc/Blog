# CSS 属性分类大全

## 前言

层叠样式表（CSS）是用于描述 HTML 或 XML 文档呈现的语言。CSS 属性是构建样式的核心，数量庞大。为了便于学习、记忆和查阅，我们将 CSS 属性按照其功能和应用场景分为以下几大类。本文档力求覆盖所有常用及重要的现代 CSS 属性。

---

## 1. 文本与字体 (Text & Typography)

这类属性用于控制文本的视觉表现，包括字体、颜色、大小、间距和排版。

#### 1.1 字体属性 (Font Properties)

- `font-family`: 定义元素的字体族，可以是一个或多个字体名称的列表。
- `font-size`: 设置字体的大小。
- `font-weight`: 设置字体的粗细（如 `normal`, `bold`, `100` 到 `900`）。
- `font-style`: 设置字体的样式（如 `normal`, `italic`, `oblique`）。
- `font-variant`: 控制小型大写字母的显示（如 `normal`, `small-caps`）。
- `line-height`: 设置行高，即行与行之间的距离。
- `font`: 以上所有字体属性的简写形式。
- `@font-face`: 用于引入自定义字体文件。

#### 1.2 文本样式 (Text Styling)

- `color`: 设置文本的颜色。
- `text-align`: 设置文本的水平对齐方式（`left`, `right`, `center`, `justify`）。
- `text-decoration`: 设置文本的装饰线（`none`, `underline`, `overline`, `line-through`）。
- `text-transform`: 控制文本的大小写转换（`none`, `capitalize`, `uppercase`, `lowercase`）。
- `text-shadow`: 为文本添加阴影效果。
- `letter-spacing`: 设置字符之间的间距。
- `word-spacing`: 设置单词之间的间距。

#### 1.3 文本布局 (Text Layout)

- `direction`: 设置文本方向（`ltr` 从左到右, `rtl` 从右到左）。
- `unicode-bidi`: 与 `direction` 属性一起使用，处理双向文本。
- `vertical-align`: 设置元素的垂直对齐方式（常用于行内元素和表格单元格）。
- `white-space`: 控制元素内的空白符如何处理（如 `normal`, `nowrap`, `pre`）。
- `word-wrap` / `overflow-wrap`: 控制当单词太长无法容纳时是否换行。
- `word-break`: 设置非 CJK (中日韩) 文本的换行规则。
- `text-overflow`: 控制当溢出内容时如何显示（如 `clip`, `ellipsis`）。
- `text-indent`: 设置块级元素首行的缩进。
- `writing-mode`: 定义文本的水平或垂直方向。

---

## 2. 盒模型 (Box Model)

盒模型描述了元素如何占据空间。每个元素都被看作一个矩形的盒子，这个盒子由内容（content）、内边距（padding）、边框（border）和外边距（margin）组成。

- `width`: 设置元素内容区域的宽度。
- `height`: 设置元素内容区域的高度。
- `min-width` / `max-width`: 设置元素的最小/最大宽度。
- `min-height` / `max-height`: 设置元素的最小/最大高度。
- `padding`: 设置所有四个方向的内边距。
    - `padding-top`, `padding-right`, `padding-bottom`, `padding-left`: 单独设置各方向内边距。
- `margin`: 设置所有四个方向的外边距。
    - `margin-top`, `margin-right`, `margin-bottom`, `margin-left`: 单独设置各方向外边距。
- `border`: 同时设置边框的宽度、样式和颜色。
    - `border-width`, `border-style`, `border-color`: 分别设置边框的宽度、样式、颜色。
    - `border-top`, `border-right`, `border-bottom`, `border-left`: 单独设置各方向边框。
    - `border-radius`: 设置元素的圆角。
- `box-sizing`: 定义如何计算元素的总宽度和高度（`content-box` 或 `border-box`）。
- `outline`: 在边框外部绘制一条轮廓线，不占据空间。
    - `outline-width`, `outline-style`, `outline-color`, `outline-offset`: 分别设置轮廓的宽度、样式、颜色和偏移。

---

## 3. 布局与定位 (Layout & Positioning)

这类属性决定了元素在页面上的位置、排列方式和相互关系，是构建页面结构的关键。

#### 3.1 显示与可见性 (Display & Visibility)

- `display`: 定义元素的显示类型（如 `block`, `inline`, `inline-block`, `none`, `flex`, `grid`）。
- `visibility`: 控制元素的可见性（`visible`, `hidden`, `collapse`）。与 `display: none` 不同，`hidden` 会保留元素所占空间。
- `opacity`: 设置元素的透明度（`0` 到 `1`）。

#### 3.2 定位 (Positioning)

- `position`: 设置元素的定位方案（`static`, `relative`, `absolute`, `fixed`, `sticky`）。
- `top`, `right`, `bottom`, `left`: 当 `position` 不为 `static` 时，用于指定元素的最终位置。
- `z-index`: 控制已定位元素的堆叠顺序（层级）。
- `clip`: 定义绝对定位元素的可见区域（已废弃，推荐使用 `clip-path`）。

#### 3.3 浮动 (Float) - *传统布局*

- `float`: 使元素脱离文档流，向左或向右浮动（`left`, `right`, `none`）。
- `clear`: 控制元素是否允许旁边有浮动元素（`left`, `right`, `both`, `none`）。

#### 3.4 弹性盒子布局 (Flexbox)

用于一维布局（行或列）。

- **容器属性 (Container):**
    - `display: flex;`
    - `flex-direction`: 设置主轴方向（`row`, `column` 等）。
    - `flex-wrap`: 控制项目是否换行（`nowrap`, `wrap` 等）。
    - `flex-flow`: `flex-direction` 和 `flex-wrap` 的简写。
    - `justify-content`: 定义项目在主轴上的对齐方式。
    - `align-items`: 定义项目在交叉轴上的对齐方式。
    - `align-content`: 定义多根轴线的对齐方式（当 `flex-wrap` 为 `wrap` 时生效）。
- **项目属性 (Items):**
    - `order`: 定义项目的排列顺序。
    - `flex-grow`: 定义项目的放大比例。
    - `flex-shrink`: 定义项目的缩小比例。
    - `flex-basis`: 定义项目在分配多余空间前的主轴尺寸。
    - `flex`: `flex-grow`, `flex-shrink`, `flex-basis` 的简写。
    - `align-self`: 允许单个项目有与其他项目不一样的 `align-items` 属性。

#### 3.5 网格布局 (Grid)

用于二维布局（行和列）。

- **容器属性 (Container):**
    - `display: grid;`
    - `grid-template-columns` / `grid-template-rows`: 定义网格的列和行。
    - `grid-template-areas`: 定义网格区域。
    - `grid-template`: 以上三个属性的简写。
    - `gap` (或 `grid-gap`): 定义网格线之间的间距。
        - `column-gap`, `row-gap`: 分别定义列和行间距。
    - `justify-items` / `align-items`: 定义单元格内容在主轴/交叉轴的对齐方式。
    - `place-items`: `align-items` 和 `justify-items` 的简写。
    - `justify-content` / `align-content`: 定义整个网格在容器内的对齐方式。
    - `place-content`: `align-content` 和 `justify-content` 的简写。
    - `grid-auto-columns` / `grid-auto-rows`: 定义隐式网格轨道的尺寸。
    - `grid-auto-flow`: 定义自动布局算法。
- **项目属性 (Items):**
    - `grid-column-start` / `grid-column-end` / `grid-row-start` / `grid-row-end`: 定义项目在网格中的位置和跨度。
    - `grid-column` / `grid-row`: 以上属性的简写。
    - `grid-area`: 指定项目所属的区域名称。
    - `justify-self` / `align-self`: 定义单个项目覆盖 `justify-items` / `align-items` 的对齐方式。
    - `place-self`: `align-self` 和 `justify-self` 的简写。

#### 3.6 多列布局 (Multi-column)

- `column-count`: 将元素内容分为指定数量的列。
- `column-width`: 指定列的理想宽度。
- `columns`: `column-width` 和 `column-count` 的简写。
- `column-gap`: 指定列之间的间距。
- `column-rule`: 设置列之间的分割线样式。
- `column-span`: 定义元素应跨越多少列。

---

## 4. 背景与装饰 (Background & Decoration)

这些属性用于美化元素的外观，如背景色、背景图、阴影和滤镜。

- `background-color`: 设置元素的背景颜色。
- `background-image`: 设置元素的背景图像。
- `background-repeat`: 控制背景图像是否以及如何重复。
- `background-position`: 设置背景图像的起始位置。
- `background-size`: 设置背景图像的尺寸。
- `background-attachment`: 控制背景图像是否随滚动条滚动（`scroll` 或 `fixed`）。
- `background-origin`: 定义背景图像的定位区域。
- `background-clip`: 定义背景的绘制区域。
- `background`: 以上所有背景属性的简写形式。
- `box-shadow`: 为元素盒子添加一个或多个阴影。
- `filter`: 对元素应用图形效果，如模糊（`blur`）、灰度（`grayscale`）等。
- `mix-blend-mode`: 定义元素内容与其背景的混合模式。
- `background-blend-mode`: 定义元素多个背景层之间的混合模式。
- `clip-path`: 使用裁剪方式创建元素的可显示区域。

---

## 5. 动画、过渡与变形 (Animation, Transition & Transform)

这些属性为页面带来动态效果。

#### 5.1 过渡 (Transitions)

- `transition-property`: 指定应用过渡效果的 CSS 属性名称。
- `transition-duration`: 指定过渡效果需要多少秒或毫秒。
- `transition-timing-function`: 指定过渡效果的速度曲线。
- `transition-delay`: 指定过渡效果何时开始。
- `transition`: 以上四个过渡属性的简写形式。

#### 5.2 动画 (Animations)

- `animation-name`: 指定 `@keyframes` 动画的名称。
- `animation-duration`: 指定动画完成一个周期所需的时间。
- `animation-timing-function`: 指定动画的速度曲线。
- `animation-delay`: 指定动画何时开始。
- `animation-iteration-count`: 指定动画应播放的次数。
- `animation-direction`: 指定动画是否应该轮流反向播放。
- `animation-fill-mode`: 指定动画在播放之前和之后如何应用样式。
- `animation-play-state`: 指定动画是运行还是暂停。
- `animation`: 以上所有动画属性的简写形式。
- `@keyframes`: 用于定义动画的关键帧。

#### 5.3 变形 (Transforms)

- `transform`: 对元素应用 2D 或 3D 转换（如 `translate`, `rotate`, `scale`, `skew`）。
- `transform-origin`: 设置转换操作的中心点。
- `transform-style`: 指定嵌套元素如何在 3D 空间中呈现（`flat` 或 `preserve-3d`）。
- `perspective`: 为 3D 定位元素设置透视效果。
- `perspective-origin`: 设置 `perspective` 属性的基点。
- `backface-visibility`: 定义当元素背面面向观察者时是否可见。

---

## 6. 用户界面与交互 (User Interface & Interaction)

这些属性影响用户与元素的交互体验。

- `cursor`: 设置当鼠标指针悬停在元素上时显示的光标类型。
- `pointer-events`: 定义元素是否可以成为鼠标事件的目标。
- `user-select`: 控制用户是否能选中文本。
- `resize`: 控制用户是否可以调整元素的尺寸。
- `scroll-behavior`: 控制滚动框的滚动行为（`auto` 或 `smooth`）。
- `overflow`, `overflow-x`, `overflow-y`: 控制内容溢出元素框时的处理方式（`visible`, `hidden`, `scroll`, `auto`）。
- `scrollbar-width` / `scrollbar-color`: 自定义滚动条的宽度和颜色。
- `accent-color`: 设置某些表单控件（如复选框、单选按钮）的强调色。
- `appearance`: 移除或改变元素的平台原生样式。

---

## 7. 特定元素样式 (Specific Element Styling)

这些属性主要用于特定类型的元素，如列表和表格。

#### 7.1 列表 (Lists)

- `list-style-type`: 设置列表项标记的类型（如 `disc`, `circle`, `decimal`）。
- `list-style-position`: 设置列表项标记的位置（`inside` 或 `outside`）。
- `list-style-image`: 使用图像作为列表项标记。
- `list-style`: 以上三个列表属性的简写形式。

#### 7.2 表格 (Tables)

- `border-collapse`: 控制表格的边框是合并还是分离。
- `border-spacing`: 当 `border-collapse` 为 `separate` 时，设置单元格之间的距离。
- `caption-side`: 设置表格标题的位置（`top` 或 `bottom`）。
- `empty-cells`: 控制是否显示空单元格的边框和背景。
- `table-layout`: 定义用于布局表格单元格、行和列的算法。

#### 7.3 生成内容 (Generated Content)

- `content`: 与 `::before` 和 `::after` 伪元素一起使用，向元素插入生成的内容。
- `counter-reset`: 创建或重置一个或多个 CSS 计数器。
- `counter-increment`: 增加一个或多个 CSS 计数器的值。
- `quotes`: 设置 `content` 属性中 `open-quote` 和 `close-quote` 的样式。

---

## 8. 其他与高级属性 (Miscellaneous & Advanced)

包含一些现代的、功能强大的或不属于以上任何一类的属性。

- **CSS 变量 (Custom Properties)**:
    - `--*`: 声明一个自定义属性。
    - `var()`: 使用一个自定义属性的值。
- **计算值**:
    - `calc()`: 在 CSS 属性值中执行数学计算。
- **逻辑属性 (Logical Properties)**:
    - 提供了基于书写模式（`writing-mode`）的布局方式，如：
    - `margin-inline-start`, `margin-block-end` (替代 `margin-left`, `margin-bottom` 等)
    - `padding-inline`, `padding-block`
    - `border-inline`, `border-block`
    - `inset` (替代 `top`, `right`, `bottom`, `left`)
- **遮罩 (Masking)**:
    - `mask-image`, `mask-mode`, `mask-repeat`, etc.: 使用图像或渐变作为遮罩来隐藏元素的部分区域。
- **形状 (Shapes)**:
    - `shape-outside`: 定义一个形状，使内联内容可以环绕它。
    - `shape-margin`: 设置 `shape-outside` 的外边距。
- **`@` 规则 (`@` Rules)** - *虽然不是属性，但与属性密切相关，用于定义样式应用条件或引入外部资源*
    - `@import`: 导入其他样式表。
    - `@media`: 根据媒体查询的结果应用不同的样式规则。
    - `@supports`: 根据浏览器是否支持某个 CSS 功能来应用样式。
    - `@layer`: 定义 CSS 级联层，以更好地控制样式优先级。

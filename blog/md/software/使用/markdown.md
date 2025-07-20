
## 标题

使用 `#` 表示标题等级，支持 1\~6 级标题：

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

---

## 段落与换行

* 段落：两个回车表示段落分隔。
* 换行：末尾添加两个空格或使用 `<br>`。

```markdown
这是第一段。

这是第二段。  
这是第二段的第二行。
```

---

## 文本格式

```markdown
**加粗** 或 __加粗__  
*斜体* 或 _斜体_  
~~删除线~~  
==高亮==（部分渲染器支持，如 Obsidian）  
`行内代码`
```

---

## 列表

### 无序列表

```markdown
- 项目 1
* 项目 2
+ 项目 3
```

### 有序列表

```markdown
1. 第一项
2. 第二项
   1. 子项 2.1
   2. 子项 2.2
```

---

## 链接

```markdown
[显示文本](https://example.com)  
<https://example.com>  
[链接带标题](https://example.com "悬浮标题")
```

---

## 图片

```markdown
![Alt 文本](https://example.com/image.jpg)  
![带标题的图片](https://example.com/image.jpg "图片标题")
```

---

## 引用

```markdown
> 这是引用内容  
>> 嵌套引用
```

---

## 代码

### 行内代码

\`代码内容\`

### 多行代码块（推荐用法）

使用三个反引号包裹：

<pre>
```python
def hello():
    print("Hello Markdown!")
```
</pre>

还可以指定语言：`python`、`bash`、`javascript`...

---

## 表格

```markdown
| 姓名 | 年龄 | 职业 |
|------|------|------|
| 张三 | 28   | 程序员 |
| 李四 | 34   | 设计师 |
```

对齐方式：

```markdown
| 左对齐 | 居中对齐 | 右对齐 |
|:------ |:--------:| ------:|
| 内容A | 内容B    | 内容C  |
```

---

## 分隔线

```markdown
---
***
___
```

---

## 转义字符

使用反斜杠 `\` 转义特殊字符：

```markdown
\*不加粗\*
\# 不变成标题
```

---

## 任务列表

```markdown
- [x] 已完成事项
- [ ] 未完成事项
```

---

## 脚注

```markdown
这里是一个脚注示例[^1]。

[^1]: 这是脚注内容。
```

---

## HTML 混用

Markdown 支持嵌入原生 HTML 标签：

```markdown
<div style="color: red;">红色文本</div>
<span style="font-weight: bold;">加粗文字</span>
```

---

## 数学公式（LaTeX）

部分 Markdown 渲染器支持数学公式，如 Typora、Obsidian、Jupyter、MathJax 等。

```markdown
行内公式：$E=mc^2$  
块级公式：
$$
\sum_{i=1}^n i = \frac{n(n+1)}{2}
$$
```

---

## 注释

```markdown
<!-- 这是注释内容，不会在页面中显示 -->
```

---

## 示例整合

````markdown
## 示例段落

这是一个段落，包含 **加粗文本** 和 `代码片段`。

- [x] 已完成任务
- [ ] 待完成任务

> 引用一句话。

```bash
echo "Hello World"
````

```

---

如需导出为 PDF、HTML 等，推荐使用工具：

- Typora（所见即所得）
- Obsidian（支持插件）
- VS Code + Markdown 插件
- Dillinger、HackMD、StackEdit 等在线编辑器

---

如需我导出这份手册为 `.md` 文件或转换为 HTML、PDF，请告诉我。
```

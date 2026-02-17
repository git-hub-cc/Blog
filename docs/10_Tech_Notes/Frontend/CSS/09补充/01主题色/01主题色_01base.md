好的，这是一个完全独立的HTML文件，包含了HTML、CSS和JavaScript，实现了您要求的所有功能。

### 功能亮点

1.  **单文件设计**：所有代码（HTML、CSS、JavaScript）都包含在一个 `.html` 文件中，方便分发和使用。
2.  **多主题切换**：内置了四种风格迥异的主题（明亮、暗黑、森林、日落），点击导航栏的按钮即可平滑切换。
3.  **主题记忆**：您的主题选择会被保存在浏览器中。下次打开或刷新页面时，会自动加载您上次选择的主题。
4.  **丰富的网页元素**：页面包含了导航栏、内容卡片、表格、有序列表、无序列表、按钮、输入框和页脚等常见元素，以全面展示主题效果。
5.  **美观与健壮**：
    *   使用CSS变量（Custom Properties）实现主题切换，这是现代Web开发中最健壮、最高效的方式。
    *   界面布局简洁、响应式，在不同尺寸的屏幕上都有不错的表现。
    *   所有交互（如按钮悬停、主题切换）都带有平滑的过渡动画，提升用户体验。

### HTML 代码

直接将以下所有代码复制到一个新的 `.html` 文件中，然后用浏览器打开即可看到效果。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>多主题切换演示页面</title>
    <style>
        /* --- 1. CSS变量定义 (主题核心) --- */
        :root {
            /* 默认主题: 明亮 (Light) */
            --primary-color: #007bff;
            --secondary-color: #6c757d;
            --background-color: #f8f9fa;
            --surface-color: #ffffff;
            --text-color: #212529;
            --text-muted-color: #6c757d;
            --border-color: #dee2e6;
            --link-color: #007bff;
            --button-text-color: #ffffff;
            --shadow-color: rgba(0, 0, 0, 0.1);
        }

        body.theme-dark {
            --primary-color: #58a6ff;
            --secondary-color: #8b949e;
            --background-color: #0d1117;
            --surface-color: #161b22;
            --text-color: #c9d1d9;
            --text-muted-color: #8b949e;
            --border-color: #30363d;
            --link-color: #58a6ff;
            --button-text-color: #ffffff;
            --shadow-color: rgba(0, 0, 0, 0.4);
        }

        body.theme-forest {
            --primary-color: #4CAF50;
            --secondary-color: #795548;
            --background-color: #f1f8e9;
            --surface-color: #ffffff;
            --text-color: #333333;
            --text-muted-color: #555555;
            --border-color: #a5d6a7;
            --link-color: #2e7d32;
            --button-text-color: #ffffff;
            --shadow-color: rgba(0, 0, 0, 0.1);
        }

        body.theme-sunset {
            --primary-color: #ff7043;
            --secondary-color: #78909c;
            --background-color: #fff3e0;
            --surface-color: #ffffff;
            --text-color: #4e342e;
            --text-muted-color: #795548;
            --border-color: #ffccbc;
            --link-color: #e64a19;
            --button-text-color: #ffffff;
            --shadow-color: rgba(0, 0, 0, 0.1);
        }

        /* --- 2. 基础和通用样式 --- */
        *, *::before, *::after {
            box-sizing: border-box;
        }

        html, body {
            height: 100%;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            margin: 0;
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .container {
            max-width: 960px;
            margin: 0 auto;
            padding: 20px;
        }

        a {
            color: var(--link-color);
            text-decoration: none;
            transition: color 0.2s ease;
        }

        a:hover {
            text-decoration: underline;
        }

        h1, h2, h3 {
            color: var(--primary-color);
            border-left: 5px solid var(--primary-color);
            padding-left: 10px;
            transition: color 0.3s ease, border-color 0.3s ease;
        }

        .card {
            background-color: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 8px var(--shadow-color);
            transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* --- 3. 特定元素样式 --- */

        /* 导航栏 */
        .navbar {
            background-color: var(--surface-color);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
            box-shadow: 0 2px 4px var(--shadow-color);
            transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        .navbar-brand {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-color);
        }

        .theme-switcher {
            display: flex;
            gap: 10px;
        }

        .theme-btn {
            padding: 8px 12px;
            border: 1px solid var(--border-color);
            background-color: var(--background-color);
            color: var(--text-color);
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.2s, color 0.2s, border-color 0.2s;
        }

        .theme-btn:hover {
            background-color: var(--primary-color);
            color: var(--button-text-color);
            border-color: var(--primary-color);
        }

        .theme-btn.active {
            background-color: var(--primary-color);
            color: var(--button-text-color);
            font-weight: bold;
            border-color: var(--primary-color);
        }

        /* 表格 */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
            transition: border-color 0.3s ease;
        }

        thead {
            background-color: var(--background-color);
            transition: background-color 0.3s ease;
        }
        
        thead th {
            color: var(--primary-color);
            font-weight: bold;
        }

        tbody tr:hover {
            background-color: var(--background-color);
        }

        /* 列表 */
        ul, ol {
            padding-left: 20px;
        }
        
        li {
            margin-bottom: 10px;
        }

        li::marker {
            color: var(--primary-color);
            font-weight: bold;
            transition: color 0.3s ease;
        }

        /* 按钮和输入框 */
        .action-button {
            background-color: var(--primary-color);
            color: var(--button-text-color);
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.2s, transform 0.2s;
        }
        .action-button:hover {
            transform: translateY(-2px);
            opacity: 0.9;
        }

        .form-input {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 5px;
            background-color: var(--surface-color);
            color: var(--text-color);
            font-size: 16px;
            margin-top: 10px;
            transition: border-color 0.3s, background-color 0.3s;
        }
        .form-input:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px var(--primary-color);
        }
        
        /* 页脚 */
        .footer {
            text-align: center;
            padding: 20px;
            margin-top: 40px;
            color: var(--text-muted-color);
            border-top: 1px solid var(--border-color);
            font-size: 14px;
        }

    </style>
</head>
<body>

    <!-- 导航栏 -->
    <header class="navbar">
        <div class="navbar-brand">网站Logo</div>
        <div class="theme-switcher">
            <button class="theme-btn" data-theme="">明亮</button>
            <button class="theme-btn" data-theme="theme-dark">暗黑</button>
            <button class="theme-btn" data-theme="theme-forest">森林</button>
            <button class="theme-btn" data-theme="theme-sunset">日落</button>
        </div>
    </header>

    <!-- 主体内容 -->
    <main class="container">
        <h1>主题切换功能展示</h1>
        <p>这是一个包含常见网页元素的演示页面。点击上方导航栏中的按钮，可以直观地看到不同主题色下的视觉效果。您的选择将被自动保存。</p>

        <div class="card">
            <h2>表格 (Table)</h2>
            <p>表格是展示结构化数据的常用方式。主题切换会影响其边框、表头和悬停效果。</p>
            <table>
                <thead>
                    <tr>
                        <th>产品名称</th>
                        <th>版本号</th>
                        <th>状态</th>
                        <th>发布日期</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>项目A</td>
                        <td>v2.1.0</td>
                        <td>活跃</td>
                        <td>2023-10-26</td>
                    </tr>
                    <tr>
                        <td>组件B</td>
                        <td>v1.5.3</td>
                        <td>维护中</td>
                        <td>2023-08-15</td>
                    </tr>
                    <tr>
                        <td>服务C</td>
                        <td>v3.0.0-beta</td>
                        <td>测试中</td>
                        <td>2023-11-01</td>
                    </tr>
                    <tr>
                        <td>工具D</td>
                        <td>v1.0.0</td>
                        <td>已归档</td>
                        <td>2022-05-20</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="card">
            <h2>列表 (Lists) 和交互元素</h2>
            <p>包括有序列表、无序列表、按钮和输入框，这些都是构成网页交互的基础。</p>
            
            <h3>功能列表 (无序列表)</h3>
            <ul>
                <li>使用CSS变量实现主题化</li>
                <li>通过JavaScript切换body的class</li>
                <li>利用LocalStorage实现主题记忆</li>
                <li>平滑的过渡动画效果</li>
            </ul>

            <h3>操作步骤 (有序列表)</h3>
            <ol>
                <li>点击导航栏中的主题按钮。</li>
                <li>观察页面所有元素颜色的变化。</li>
                <li>刷新页面，确认主题被保存。</li>
            </ol>
            
            <h3>交互演示</h3>
            <button class="action-button">一个醒目的按钮</button>
            <input type="text" class="form-input" placeholder="输入一些文字试试...">
        </div>

    </main>
    
    <!-- 页脚 -->
    <footer class="footer">
        <p>&copy; 2023 网页设计演示。保留所有权利。</p>
    </footer>

    <script>
    // --- JavaScript 逻辑 ---
    document.addEventListener('DOMContentLoaded', () => {
        const themeSwitcher = document.querySelector('.theme-switcher');
        const themeButtons = document.querySelectorAll('.theme-btn');
        const body = document.body;
        const storageKey = 'theme-preference';

        // 1. 设置当前活动按钮状态的函数
        const setActiveButton = (theme) => {
            themeButtons.forEach(button => {
                if (button.dataset.theme === theme) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        };

        // 2. 加载用户偏好的主题
        const loadTheme = () => {
            // 从localStorage获取保存的主题，如果没有，则默认为空字符串（明亮主题）
            const savedTheme = localStorage.getItem(storageKey) || ''; 
            body.className = savedTheme; // 应用主题到body
            setActiveButton(savedTheme); // 更新按钮的激活状态
        };

        // 3. 为主题切换按钮添加点击事件监听
        themeSwitcher.addEventListener('click', (event) => {
            // 事件委托：确保点击的是按钮
            if (event.target.tagName === 'BUTTON') {
                const theme = event.target.dataset.theme;
                body.className = theme; // 应用新主题
                localStorage.setItem(storageKey, theme); // 保存新主题到localStorage
                setActiveButton(theme); // 更新按钮的激活状态
            }
        });

        // 页面加载时立即执行加载主题的逻辑
        loadTheme();
    });
    </script>

</body>
</html>
```

### 代码讲解

1.  **HTML 结构**
    *   使用了标准的 HTML5 语义化标签，如 `<header>`, `<main>`, `<footer>`, `<nav>`, `<table>` 等。
    *   在导航栏中，每个主题按钮都有一个 `data-theme` 属性，用于存储其代表的主题类名（例如 `theme-dark`）。这是在HTML和JS之间传递数据的好方法。空字符串 `""` 代表默认的明亮主题。

2.  **CSS 样式**
    *   **核心是 `:root` 选择器**：在这里定义了一组CSS变量（以 `--` 开头），这些变量构成了默认的“明亮”主题。页面上所有元素的颜色都引用了这些变量（例如 `color: var(--text-color);`）。
    *   **主题类**：为每个其他主题（`theme-dark`, `theme-forest`, `theme-sunset`）创建了一个 `body` 的类选择器。在这些类中，**只做一件事：重新定义 `:root` 中的CSS变量**。
    *   **工作原理**：当JavaScript给 `<body>` 标签添加 `class="theme-dark"` 时，CSS会立即应用 `body.theme-dark` 中定义的变量值，由于整个页面的颜色都依赖这些变量，所以所有元素的外观会瞬间、统一地改变。
    *   **过渡动画**：在 `body` 和其他关键元素上添加了 `transition` 属性，使得颜色变化不是生硬的闪烁，而是平滑的渐变，大大提升了美感。

3.  **JavaScript 逻辑**
    *   **`DOMContentLoaded` 事件**：确保所有HTML元素都加载完毕后再执行脚本，这是健壮性的体现。
    *   **获取元素**：通过 `querySelector` 和 `querySelectorAll` 获取需要操作的元素。
    *   **`loadTheme` 函数**：页面加载时运行。它会尝试从浏览器的 `localStorage` 中读取之前保存的主题。如果找到了，就应用该主题；如果没找到，则使用默认的明亮主题。
    *   **事件监听与事件委托**：在父容器 `.theme-switcher` 上监听点击事件。这样做比给每个按钮单独添加监听器更高效。当点击发生时，检查被点击的是否是 `BUTTON`。
    *   **切换逻辑**：当按钮被点击时，脚本会：
        1.  从按钮的 `data-theme` 属性获取主题名。
        2.  将这个主题名设置为 `<body>` 的 `className`，触发CSS的样式更新。
        3.  使用 `localStorage.setItem()` 将这个选择保存起来，以便下次访问时使用。
        4.  调用 `setActiveButton` 更新按钮的视觉状态，让用户知道当前是哪个主题。
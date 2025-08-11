好的，这是一个包含了 HTML, CSS, 和 JavaScript 的完整单文件示例。它实现了一个简单的用户管理系统（添加、显示、编辑、删除），直观地展示了 IndexedDB 的核心操作，并注重了代码的健壮性和界面的美观性。

### 文件名：`indexeddb-demo.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IndexedDB 直观演示</title>
    <style>
        /* 1. 全局与布局样式 (Global & Layout) */
        :root {
            --primary-color: #007bff;
            --secondary-color: #6c757d;
            --success-color: #28a745;
            --danger-color: #dc3545;
            --light-color: #f8f9fa;
            --dark-color: #343a40;
            --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            --border-radius: 0.3rem;
            --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        body {
            font-family: var(--font-family);
            background-color: #e9ecef;
            color: var(--dark-color);
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
        }

        .container {
            width: 100%;
            max-width: 800px;
            background-color: #fff;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            overflow: hidden;
        }

        header {
            background-color: var(--primary-color);
            color: white;
            padding: 20px;
            text-align: center;
        }

        header h1 {
            margin: 0;
            font-size: 1.8em;
        }

        main {
            padding: 25px;
            display: grid;
            grid-template-columns: 1fr;
            gap: 30px;
        }

        /* 2. 表单样式 (Form) */
        .form-container, .data-container {
            padding: 20px;
            border: 1px solid #dee2e6;
            border-radius: var(--border-radius);
        }

        h2 {
            margin-top: 0;
            color: var(--primary-color);
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 10px;
        }
        
        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }

        .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: var(--border-radius);
            box-sizing: border-box;
            transition: border-color 0.2s;
        }

        .form-group input:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
        }

        .button-group {
            display: flex;
            gap: 10px;
        }

        button {
            padding: 10px 15px;
            border: none;
            border-radius: var(--border-radius);
            color: white;
            cursor: pointer;
            font-size: 1em;
            transition: background-color 0.2s, transform 0.1s;
        }

        button:hover {
            opacity: 0.9;
        }
        
        button:active {
            transform: scale(0.98);
        }

        .btn-submit { background-color: var(--primary-color); }
        .btn-cancel { background-color: var(--secondary-color); }
        .btn-edit { background-color: var(--success-color); }
        .btn-delete { background-color: var(--danger-color); }

        /* 3. 数据表格样式 (Data Table) */
        .table-wrapper {
            overflow-x: auto;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #dee2e6;
        }

        thead {
            background-color: var(--light-color);
        }

        tbody tr:hover {
            background-color: #f1f1f1;
        }
        
        td .button-group {
            flex-wrap: wrap;
        }

        /* 4. 状态/消息提示样式 (Status Message) */
        #status-message {
            padding: 15px;
            margin: 0 25px 25px 25px;
            border-radius: var(--border-radius);
            text-align: center;
            font-weight: 600;
            display: none; /* 初始隐藏 */
        }
        
        #status-message.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            display: block;
        }

        #status-message.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            display: block;
        }
    </style>
</head>
<body>

    <div class="container">
        <header>
            <h1>IndexedDB 用户管理系统</h1>
        </header>

        <div id="status-message"></div>

        <main>
            <section class="form-container">
                <h2 id="form-title">添加新用户</h2>
                <form id="user-form">
                    <!-- 隐藏域，用于存储正在编辑的用户的ID -->
                    <input type="hidden" id="userId">
                    
                    <div class="form-group">
                        <label for="name">姓名:</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="age">年龄:</label>
                        <input type="number" id="age" required>
                    </div>
                    <div class="form-group">
                        <label for="email">邮箱:</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="button-group">
                        <button type="submit" class="btn-submit" id="submit-button">添加用户</button>
                        <button type="button" class="btn-cancel" id="cancel-button" style="display: none;">取消编辑</button>
                    </div>
                </form>
            </section>

            <section class="data-container">
                <h2>用户列表</h2>
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>姓名</th>
                                <th>年龄</th>
                                <th>邮箱</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody id="user-table-body">
                            <!-- 数据将由JavaScript动态填充 -->
                            <tr><td colspan="5" style="text-align:center;">正在加载数据...</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    </div>

    <script>
    // 立即执行函数表达式 (IIFE) 以避免污染全局作用域
    (function() {
        // --- 1. 检查浏览器支持与初始化 ---
        if (!window.indexedDB) {
            showStatus("你的浏览器不支持 IndexedDB，请更换现代浏览器。", true);
            return;
        }

        // --- 2. 定义数据库常量和全局变量 ---
        const DB_NAME = 'UserManagementDB';
        const DB_VERSION = 1;
        const STORE_NAME = 'users';
        let db; // 用于存储数据库连接对象

        // DOM 元素引用
        const userForm = document.getElementById('user-form');
        const userIdInput = document.getElementById('userId');
        const nameInput = document.getElementById('name');
        const ageInput = document.getElementById('age');
        const emailInput = document.getElementById('email');
        const userTableBody = document.getElementById('user-table-body');
        const statusMessage = document.getElementById('status-message');
        const formTitle = document.getElementById('form-title');
        const submitButton = document.getElementById('submit-button');
        const cancelButton = document.getElementById('cancel-button');

        // --- 3. 数据库核心操作函数 ---

        /**
         * 打开或创建数据库
         * 这是所有操作的入口
         */
        function openDB() {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            // 错误处理：数据库打开失败
            request.onerror = (event) => {
                console.error('数据库打开失败:', event.target.error);
                showStatus('数据库连接失败，请检查浏览器设置或权限。', true);
            };

            // 成功处理：数据库打开成功
            request.onsuccess = (event) => {
                db = event.target.result;
                console.log('数据库连接成功!');
                displayData(); // 成功后立即显示数据
            };

            // 版本升级处理：首次创建或版本变更时触发
            // 这是定义数据库结构的唯一地方
            request.onupgradeneeded = (event) => {
                const dbInstance = event.target.result;
                console.log('数据库版本升级或首次创建...');
                
                // 创建一个对象存储空间（类似SQL中的表）
                // keyPath: 'id' 指定 'id' 字段为主键
                // autoIncrement: true 让主键自增
                const objectStore = dbInstance.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });

                // 创建索引，可以加速按这些字段的查询
                // 'nameIndex': 索引名, 'name': 索引的字段, { unique: false }: 是否要求唯一
                objectStore.createIndex('nameIndex', 'name', { unique: false });
                objectStore.createIndex('emailIndex', 'email', { unique: true });

                console.log('对象存储空间和索引创建成功!');
            };
        }

        /**
         * 显示所有用户数据
         */
        function displayData() {
            if (!db) {
                console.error("数据库未连接，无法显示数据。");
                return;
            }
            
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.getAll();

            request.onerror = (event) => {
                console.error('获取数据失败:', event.target.error);
                showStatus('无法加载用户列表。', true);
            };

            request.onsuccess = (event) => {
                const users = event.target.result;
                userTableBody.innerHTML = ''; // 清空现有表格

                if (users.length === 0) {
                    userTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">数据库中还没有用户数据。</td></tr>';
                } else {
                    users.forEach(user => {
                        const row = userTableBody.insertRow();
                        row.innerHTML = `
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>
                                <div class="button-group">
                                    <button class="btn-edit" data-id="${user.id}">编辑</button>
                                    <button class="btn-delete" data-id="${user.id}">删除</button>
                                </div>
                            </td>
                        `;
                    });
                }
            };
        }

        /**
         * 添加或更新用户
         * @param {Event} event 表单提交事件
         */
        function addOrUpdateUser(event) {
            event.preventDefault(); // 阻止表单默认提交行为

            const id = Number(userIdInput.value);
            const user = {
                name: nameInput.value.trim(),
                age: Number(ageInput.value),
                email: emailInput.value.trim(),
            };
            
            // 简单验证
            if (!user.name || !user.age || !user.email) {
                showStatus("请填写所有字段！", true);
                return;
            }
            
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const objectStore = transaction.objectStore(STORE_NAME);
            let request;

            if (id) {
                // 更新模式
                user.id = id;
                request = objectStore.put(user);
            } else {
                // 添加模式
                request = objectStore.add(user);
            }

            request.onerror = (event) => {
                console.error('操作失败:', event.target.error);
                // 常见的错误是违反唯一性约束（如邮箱重复）
                if (event.target.error.name === 'ConstraintError') {
                    showStatus('操作失败：该邮箱地址已存在！', true);
                } else {
                    showStatus('数据操作失败，请重试。', true);
                }
            };

            request.onsuccess = () => {
                showStatus(id ? '用户更新成功！' : '用户添加成功！', false);
                clearForm();
                displayData();
            };
        }
        
        /**
         * 填充表单以进行编辑
         * @param {number} id 要编辑的用户ID
         */
        function editUser(id) {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.get(id);

            request.onerror = (event) => {
                console.error('获取待编辑用户失败:', event.target.error);
                showStatus('无法找到该用户进行编辑。', true);
            };

            request.onsuccess = (event) => {
                const user = event.target.result;
                if (user) {
                    userIdInput.value = user.id;
                    nameInput.value = user.name;
                    ageInput.value = user.age;
                    emailInput.value = user.email;

                    // 切换到编辑模式UI
                    formTitle.textContent = '编辑用户';
                    submitButton.textContent = '更新用户';
                    cancelButton.style.display = 'inline-block';
                    window.scrollTo(0, 0); // 滚动到页面顶部方便编辑
                }
            };
        }


        /**
         * 删除用户
         * @param {number} id 要删除的用户ID
         */
        function deleteUser(id) {
            if (!confirm(`确定要删除 ID 为 ${id} 的用户吗？此操作不可撤销。`)) {
                return;
            }

            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const objectStore = transaction.objectStore(STORE_NAME);
            const request = objectStore.delete(id);

            request.onerror = (event) => {
                console.error('删除失败:', event.target.error);
                showStatus('删除用户失败。', true);
            };

            request.onsuccess = () => {
                showStatus(`用户 (ID: ${id}) 已成功删除。`, false);
                // 如果正在编辑的项被删除，则清空表单
                if (Number(userIdInput.value) === id) {
                    clearForm();
                }
                displayData();
            };
        }

        // --- 4. 工具函数 ---

        /**
         * 清空表单并恢复到添加模式
         */
        function clearForm() {
            userForm.reset();
            userIdInput.value = '';
            formTitle.textContent = '添加新用户';
            submitButton.textContent = '添加用户';
            cancelButton.style.display = 'none';
        }

        /**
         * 显示状态消息
         * @param {string} message 要显示的消息
         * @param {boolean} isError 是否为错误消息
         */
        function showStatus(message, isError = false) {
            statusMessage.textContent = message;
            statusMessage.className = isError ? 'error' : 'success';
            // 3秒后自动隐藏成功消息
            if (!isError) {
                setTimeout(() => {
                    statusMessage.style.display = 'none';
                }, 3000);
            }
        }

        // --- 5. 事件监听器 ---

        // 监听表单提交
        userForm.addEventListener('submit', addOrUpdateUser);
        
        // 监听取消编辑按钮
        cancelButton.addEventListener('click', clearForm);

        // 使用事件委托来处理表格中的点击事件，提高性能
        userTableBody.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('btn-edit')) {
                const id = Number(target.dataset.id);
                editUser(id);
            } else if (target.classList.contains('btn-delete')) {
                const id = Number(target.dataset.id);
                deleteUser(id);
            }
        });

        // --- 6. 启动应用 ---
        openDB();

    })();
    </script>

</body>
</html>
```

### 如何使用

1.  将以上所有代码复制并粘贴到一个名为 `indexeddb-demo.html` 的新文件中。
2.  用现代浏览器（如 Chrome, Firefox, Edge, Safari）打开这个 HTML 文件。

### 功能和设计亮点

1.  **直观性 (Intuitive)**
    *   **界面分离**: 界面分为“表单区”和“数据列表区”，操作与结果一目了然。
    *   **实时反馈**: 添加、更新、删除操作后，下方的用户列表会立即刷新，直观展示数据库的变化。
    *   **状态消息**: 顶部的状态栏会清晰地提示操作成功或失败，并对错误类型做了简单区分（如邮箱重复）。
    *   **编辑模式切换**: 点击“编辑”按钮，数据会填充到表单中，标题和按钮文本也会相应改变，引导用户进行更新操作。

2.  **健壮性 (Robustness)**
    *   **浏览器支持检查**: 代码首先检查 `window.indexedDB` 是否存在，如果不支持则优雅地提示用户。
    *   **完整的错误处理**: 每个数据库请求（`open`, `add`, `put`, `get`, `getAll`, `delete`）都包含了 `.onerror` 事件处理，并将错误信息打印到控制台和UI上。
    *   **事务管理**: 所有的数据读写操作都在事务（`transaction`）中进行，确保了数据的原子性和一致性。只读操作使用 `readonly` 事务，写入操作使用 `readwrite`，这是最佳实践。
    *   **版本管理 (`onupgradeneeded`)**: 正确使用 `onupgradeneeded` 事件来初始化数据库结构（创建对象存储和索引），这是 IndexedDB 设计的核心，确保数据库结构能平滑升级。
    *   **主键和索引**: 使用了自增主键 (`autoIncrement`) 和索引 (`createIndex`)，这是数据库设计的标准做法，保证了数据的唯一标识并能优化查询性能。
    *   **作用域隔离 (IIFE)**: 所有 JavaScript 代码被包裹在 `(function() { ... })();` 中，创建了一个私有作用域，避免了全局变量污染。
    *   **事件委托**: 对表格中的“编辑”和“删除”按钮使用了事件委托，只在 `<tbody>` 上绑定一个监听器，而不是为每一行的按钮都绑定，这在数据量大时能显著提升性能和减少内存占用。

3.  **美观性 (Aesthetics)**
    *   **现代设计**: 使用了简洁、干净的卡片式布局，有阴影和圆角。
    *   **清晰的排版**: 良好的字体选择、间距和对齐，使信息易于阅读。
    *   **色彩系统**: 使用了 CSS 变量 (`:root`) 定义了一套和谐的色彩方案（主色、成功色、危险色等），方便统一修改和维护。
    *   **交互反馈**: 按钮有 `hover` 和 `active` 效果，输入框在 `focus` 时有高亮，提供了良好的用户交互体验。
    *   **响应式考虑**: 使用 `max-width` 使布局在不同宽度的屏幕上都能良好显示，`overflow-x: auto` 保证了表格在小屏幕上可以水平滚动，不会破坏布局。
好的，这是一个符合您要求的 HTML 文件。它将所有 CSS 和 JavaScript 代码内联在一个文件中，方便您直接保存为 `.html` 文件并在浏览器中打开查看。

### 设计思路

1.  **直观体现 (Intuitive Demonstration)**
    *   **实时聊天室模型**: 这是最经典、最直观的 WebSocket 示例。用户可以清晰地看到自己发送的消息和从服务器“回显”的消息，实时性一目了然。
    *   **状态可视化**: 连接状态（未连接、连接中、已连接、错误、已关闭）会用不同的颜色和文字清晰地显示在界面上，让用户随时了解当前 WebSocket 的状态。
    *   **消息分类**: 发送的消息和接收的消息使用不同的背景颜色和对齐方式，模拟真实聊天软件的体验，使交互逻辑更清晰。

2.  **良好健壮性 (Good Robustness)**
    *   **状态管理**: UI 控件（如连接/断开/发送按钮、输入框）会根据连接状态自动启用或禁用，防止用户在不正确的状态下进行操作（例如，在未连接时点击发送）。
    *   **错误处理**: `onerror` 和 `onclose` 事件都被妥善处理。当连接发生错误或意外断开时，界面会给出明确的提示，而不是崩溃或无响应。
    *   **输入验证**: 在发送消息前会检查输入框是否为空，以及 WebSocket 是否处于连接状态。
    *   **默认服务器**: 提供一个公开的 WebSocket Echo 服务器地址 (`wss://echo.websocket.events`) 作为默认值，用户无需自己搭建服务器即可立即体验。

3.  **较为美观 (Reasonably Good-looking)**
    *   **现代化布局**: 使用 Flexbox 进行布局，整体居中，结构清晰。
    *   **卡片式设计**: 主体内容区域采用圆角和阴影，营造出悬浮的卡片效果，更具现代感。
    *   **和谐的配色**: 采用蓝色作为主题色，搭配灰色、绿色、红色等状态色，视觉上清晰舒适。
    *   **交互反馈**: 按钮有悬停（hover）效果，输入框有聚焦（focus）效果，提升了用户体验。
    *   **响应式设计**: 在小屏幕设备（如手机）上也能保持良好的布局和可读性。

### 代码实现

将以下所有代码复制并保存为一个 `.html` 文件（例如 `websocket_demo.html`），然后用现代浏览器（如 Chrome, Firefox, Edge）打开即可。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSocket 直观体验</title>
    <style>
        /* --- 整体样式 --- */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #f0f2f5;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: #333;
        }

        .container {
            width: 100%;
            max-width: 800px;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        header {
            background-color: #007bff;
            color: white;
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid #dee2e6;
        }

        header h1 {
            margin: 0;
            font-size: 1.8em;
        }

        main {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        /* --- 控制区域 --- */
        .controls, .message-sender {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            align-items: center;
        }
        
        input[type="text"] {
            flex-grow: 1;
            padding: 10px 15px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 1em;
            transition: border-color 0.3s, box-shadow 0.3s;
        }

        input[type="text"]:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
            outline: none;
        }

        button {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-size: 1em;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.1s;
        }

        button:active {
            transform: scale(0.98);
        }

        .btn-connect { background-color: #28a745; color: white; }
        .btn-connect:hover { background-color: #218838; }

        .btn-disconnect { background-color: #dc3545; color: white; }
        .btn-disconnect:hover { background-color: #c82333; }

        .btn-send { background-color: #007bff; color: white; }
        .btn-send:hover { background-color: #0056b3; }

        button:disabled {
            background-color: #6c757d;
            cursor: not-allowed;
            opacity: 0.7;
        }

        /* --- 状态显示 --- */
        #status-bar {
            padding: 8px 15px;
            border-radius: 6px;
            font-weight: bold;
            text-align: center;
        }
        .status-disconnected { background-color: #f8d7da; color: #721c24; }
        .status-connecting { background-color: #fff3cd; color: #856404; }
        .status-connected { background-color: #d4edda; color: #155724; }

        /* --- 消息区域 --- */
        .chat-window {
            height: 350px;
            border: 1px solid #dee2e6;
            border-radius: 6px;
            padding: 15px;
            overflow-y: auto;
            background-color: #f8f9fa;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .message {
            max-width: 70%;
            padding: 10px 15px;
            border-radius: 12px;
            word-wrap: break-word;
        }

        .message.sent {
            background-color: #007bff;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 2px;
        }

        .message.received {
            background-color: #e9ecef;
            color: #333;
            align-self: flex-start;
            border-bottom-left-radius: 2px;
        }
        
        .message.system {
            background-color: transparent;
            color: #6c757d;
            font-style: italic;
            font-size: 0.9em;
            text-align: center;
            align-self: center;
        }
        
        /* --- 响应式设计 --- */
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            .controls, .message-sender {
                flex-direction: column;
                align-items: stretch;
            }
        }
    </style>
</head>
<body>

    <div class="container">
        <header>
            <h1>WebSocket 直观体验</h1>
        </header>

        <main>
            <!-- 连接控制 -->
            <section class="control-panel">
                <div class="controls">
                    <input type="text" id="wsUrl" value="wss://echo.websocket.events" placeholder="输入 WebSocket 服务器地址">
                    <button id="connectBtn" class="btn-connect">连接</button>
                    <button id="disconnectBtn" class="btn-disconnect" disabled>断开</button>
                </div>
                <div id="status-bar" class="status-disconnected">状态: 未连接</div>
            </section>

            <!-- 聊天窗口 -->
            <section class="chat-area">
                <div class="chat-window" id="messages">
                    <div class="message system">欢迎使用 WebSocket 聊天室！请输入一个公共 Echo 服务器地址 (如默认值) 并点击“连接”。</div>
                </div>
            </section>
            
            <!-- 消息发送 -->
            <section class="message-sender">
                <input type="text" id="messageInput" placeholder="在此输入要发送的消息..." disabled>
                <button id="sendBtn" class="btn-send" disabled>发送</button>
            </section>
        </main>
    </div>

    <script>
        // --- DOM 元素获取 ---
        const wsUrlInput = document.getElementById('wsUrl');
        const connectBtn = document.getElementById('connectBtn');
        const disconnectBtn = document.getElementById('disconnectBtn');
        const sendBtn = document.getElementById('sendBtn');
        const messageInput = document.getElementById('messageInput');
        const messagesDiv = document.getElementById('messages');
        const statusBar = document.getElementById('status-bar');

        let websocket = null;

        // --- UI 更新函数 ---
        function updateUIState(state) {
            switch (state) {
                case 'connected':
                    connectBtn.disabled = true;
                    disconnectBtn.disabled = false;
                    sendBtn.disabled = false;
                    messageInput.disabled = false;
                    wsUrlInput.disabled = true;
                    statusBar.textContent = '状态: 已连接';
                    statusBar.className = 'status-connected';
                    break;
                case 'disconnected':
                    connectBtn.disabled = false;
                    disconnectBtn.disabled = true;
                    sendBtn.disabled = true;
                    messageInput.disabled = true;
                    wsUrlInput.disabled = false;
                    statusBar.textContent = '状态: 未连接 / 已关闭';
                    statusBar.className = 'status-disconnected';
                    break;
                case 'connecting':
                    connectBtn.disabled = true;
                    disconnectBtn.disabled = false; // 允许在连接过程中取消
                    sendBtn.disabled = true;
                    messageInput.disabled = true;
                    wsUrlInput.disabled = true;
                    statusBar.textContent = '状态: 正在连接...';
                    statusBar.className = 'status-connecting';
                    break;
            }
        }

        // --- 消息记录函数 ---
        function logMessage(message, type) {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${type}`; // type: 'sent', 'received', or 'system'
            messageElement.textContent = message;
            messagesDiv.appendChild(messageElement);
            // 自动滚动到最新消息
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        // --- WebSocket核心逻辑 ---
        function connect() {
            const wsUrl = wsUrlInput.value.trim();
            if (!wsUrl) {
                alert('请输入 WebSocket 服务器地址！');
                return;
            }

            if (websocket && (websocket.readyState === WebSocket.OPEN || websocket.readyState === WebSocket.CONNECTING)) {
                logMessage('系统：已经存在一个连接，请先断开。', 'system');
                return;
            }

            updateUIState('connecting');
            logMessage(`系统：尝试连接到 ${wsUrl}...`, 'system');

            websocket = new WebSocket(wsUrl);

            // 连接成功
            websocket.onopen = (event) => {
                console.log('WebSocket connection opened:', event);
                updateUIState('connected');
                logMessage('系统：WebSocket 连接成功！', 'system');
            };

            // 收到消息
            websocket.onmessage = (event) => {
                console.log('Message from server:', event.data);
                // 对于 Echo 服务器，收到的就是我们发出的，这里模拟为“接收”
                logMessage(`接收: ${event.data}`, 'received');
            };

            // 连接关闭
            websocket.onclose = (event) => {
                console.log('WebSocket connection closed:', event);
                const reason = event.reason ? `原因: ${event.reason}` : (event.wasClean ? '正常关闭' : '意外断开');
                logMessage(`系统：连接已关闭。(${reason})`, 'system');
                updateUIState('disconnected');
                websocket = null;
            };

            // 发生错误
            websocket.onerror = (event) => {
                console.error('WebSocket Error:', event);
                logMessage('系统：连接发生错误！请检查地址或网络连接。', 'system');
                // onerror 之后通常会触发 onclose
                // 这里确保UI状态更新，以防万一
                updateUIState('disconnected');
                websocket = null; // 确保清理实例
            };
        }

        function disconnect() {
            if (websocket) {
                logMessage('系统：正在断开连接...', 'system');
                websocket.close(1000, "用户主动断开"); // 1000 表示正常关闭
            }
        }

        function sendMessage() {
            if (!websocket || websocket.readyState !== WebSocket.OPEN) {
                logMessage('系统：连接未建立，无法发送消息。', 'system');
                return;
            }

            const message = messageInput.value.trim();
            if (message) {
                websocket.send(message);
                logMessage(`发送: ${message}`, 'sent');
                messageInput.value = '';
                messageInput.focus();
            }
        }

        // --- 事件监听器绑定 ---
        connectBtn.addEventListener('click', connect);
        disconnectBtn.addEventListener('click', disconnect);
        sendBtn.addEventListener('click', sendMessage);

        // 允许按 Enter 键发送消息
        messageInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // 防止回车换行
                sendMessage();
            }
        });

        // --- 页面加载时初始化UI ---
        window.addEventListener('load', () => {
            updateUIState('disconnected');
        });

    </script>
</body>
</html>
```

### 如何使用

1.  **保存文件**: 将上面的全部代码复制到一个文本编辑器中，保存为 `websocket_demo.html`。
2.  **打开浏览器**: 使用任何现代网页浏览器（如 Chrome, Firefox, Safari, Edge）打开这个 HTML 文件。
3.  **连接**:
    *   页面会预先填好一个公开的 WebSocket 回显（Echo）服务器地址 `wss://echo.websocket.events`。
    *   点击绿色的 **“连接”** 按钮。
    *   观察状态栏的变化：“正在连接...” -> “已连接”。
    *   消息窗口会显示连接过程的系统日志。
4.  **发送和接收消息**:
    *   连接成功后，下方的消息输入框和 **“发送”** 按钮会变为可用状态。
    *   在输入框中输入任何文本（例如“你好世界”），然后点击“发送”或按回车键。
    *   您会立刻在消息窗口看到两条新消息：
        *   一条蓝色的 **“发送: 你好世界”**，代表您客户端发出的消息。
        *   一条灰色的 **“接收: 你好世界”**，代表从 Echo 服务器原样返回的消息。这直观地证明了数据通过 WebSocket 进行了双向通信。
5.  **断开连接**:
    *   点击红色的 **“断开”** 按钮。
    *   连接会关闭，状态栏和UI控件会恢复到初始的“未连接”状态。

这个示例完整地展示了 WebSocket 的生命周期（连接、打开、收发消息、关闭、错误），并提供了美观、健壮的用户界面，非常适合用于学习和演示。
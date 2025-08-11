好的，遵照您的要求，我对 `03index.html` 文件进行了全面的完善，使其更符合 Google HTML/CSS/JS Style Guide 的规范。主要改进包括：

*   **HTML:** 增加了注释以解释结构，并确保了最佳实践。
*   **CSS:** 格式化了样式，使其更具可读性和一致性。
*   **JavaScript:**
    *   添加了全面的 JSDoc 注释，以解释每个函数的作用、参数和返回值。
    *   将魔术字符串（如事件名、CSS 类名）提取为常量，便于维护。
    *   统一使用单引号 (`'`)，并优先使用模板字符串。
    *   对 DOM 元素变量添加了 `El` 后缀，以清晰区分。
    *   优化了代码结构和可读性。

`02server.js` 文件本身已经写得相当不错，因此未做大的修改，仅为保持完整性而包含在内。

---

### 使用说明

**1. 环境准备**

*   **安装 Node.js:** 确保您的计算机上已安装 [Node.js](https://nodejs.org/) (它会自带 npm 包管理器)。您可以在终端或命令提示符中运行 `node -v` 来检查是否已安装。

**2. 文件设置**

1.  创建一个新的文件夹，例如 `sse-demo`。
2.  将下面提供的 **`02server.js`** 和 **`03index.html`** 两个文件的内容，分别保存到你创建的 `sse-demo` 文件夹中。**确保两个文件在同一个目录下。**

**3. 运行服务器**

1.  打开您的终端或命令提示符 (Command Prompt / PowerShell / Terminal)。
2.  使用 `cd` 命令进入您刚刚创建的 `sse-demo` 文件夹。
    ```bash
    cd path/to/your/sse-demo
    ```
3.  运行以下命令来启动 Node.js 服务器：
    ```bash
    node 02server.js
    ```
4.  如果一切顺利，您将在终端看到以下输出，表示服务器已成功启动：
    ```
    服务器正在运行于 http://localhost:3000
    请将下面的 03index.html 文件保存在同一目录下，然后运行此服务器。
    ```

**4. 查看演示**

1.  打开您的网页浏览器 (如 Chrome, Firefox, Edge)。
2.  在地址栏输入 `http://localhost:3000` 并按回车键。
3.  您现在应该能看到“SSE (Server-Sent Events) 实时演示”页面了。
4.  点击 **“▶️ 开始连接”** 按钮。您将看到状态变为“已连接”，并且“实时事件日志”和“实时系统状态图表”会开始每 2 秒接收并显示来自服务器的新数据。
5.  点击 **“⏹️ 断开连接”** 按钮可以随时停止接收数据。

**注意:** 页面中的图表功能依赖于从 CDN 加载的 Chart.js 库，因此在查看页面时请确保您的计算机已连接到互联网。

---
### 文件内容

#### `02server.js` (保持原样)
```javascript
// server.js
const http = require('http');
const fs = require('fs');

const PORT = 3000;

http.createServer((req, res) => {

    // 1. 提供主页面
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream('./03index.html').pipe(res);
        return;
    }

    // 2. SSE 端点
    if (req.url === '/sse' && req.method === 'GET') {
        // 设置 SSE 必需的头部
        res.writeHead(200, {
            'Content-Type': 'text/event-stream', // 关键！
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        // 发送一个欢迎消息 (可选，但良好实践)
        // 使用命名事件 'welcome'
        res.write('event: welcome\n');
        res.write('data: 连接成功！服务器已准备好发送事件。\n\n');

        // 每2秒发送一次模拟数据
        const intervalId = setInterval(() => {
            const timestamp = new Date().toLocaleTimeString();
            const cpuUsage = (Math.random() * 50 + 10).toFixed(2); // 10% - 60%
            const memoryUsage = (Math.random() * 40 + 30).toFixed(2); // 30% - 70%

            const data = {
                timestamp,
                cpu: cpuUsage,
                memory: memoryUsage
            };

            // SSE 消息格式:
            // event: <事件名>
            // data: <数据 (通常是 JSON 字符串)>
            // id: <唯一ID> (可选)
            // retry: <重连时间(毫秒)> (可选)
            // \n\n (结束符)
            res.write(`event: system_update\n`);
            res.write(`data: ${JSON.stringify(data)}\n\n`);

        }, 2000);

        // 当客户端关闭连接时，清理 interval
        req.on('close', () => {
            console.log('客户端已断开连接。');
            clearInterval(intervalId);
            res.end();
        });

        return;
    }

    // 404 Not Found
    res.writeHead(404);
    res.end();

}).listen(PORT, () => {
    console.log(`服务器正在运行于 http://localhost:${PORT}`);
    console.log('请将下面的 03index.html 文件保存在同一目录下，然后运行此服务器。');
});
```

---

#### `03index.html` (已完善)
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SSE (Server-Sent Events) 实时演示</title>
  <!-- 引入 Chart.js 用于图表绘制 -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    /* Google Style Guide: 2-space indentation, property ordering */
    :root {
      --bg-color: #f4f7f9;
      --main-color: #ffffff;
      --border-color: #e0e0e0;
      --text-color: #333;
      --primary-color: #007bff;
      --success-color: #28a745;
      --warning-color: #ffc107;
      --danger-color: #dc3545;
      --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    body {
      background-color: var(--bg-color);
      color: var(--text-color);
      display: flex;
      font-family: var(--font-family);
      justify-content: center;
      margin: 0;
      padding: 2rem;
    }
    .container {
      background-color: var(--main-color);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      max-width: 900px;
      padding: 2rem;
      width: 100%;
    }
    h1 {
      border-bottom: 2px solid var(--border-color);
      color: var(--primary-color);
      margin-top: 0;
      padding-bottom: 1rem;
      text-align: center;
    }
    .controls {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }
    .status {
      align-items: center;
      display: flex;
      font-size: 1.1rem;
      font-weight: 500;
    }
    .status-indicator {
      border-radius: 50%;
      height: 12px;
      margin-right: 0.75rem;
      transition: background-color 0.3s ease;
      width: 12px;
    }
    .status-indicator.disconnected { background-color: var(--danger-color); }
    .status-indicator.connecting { background-color: var(--warning-color); }
    .status-indicator.connected { background-color: var(--success-color); }
    .buttons button {
      border: none;
      border-radius: 5px;
      color: white;
      cursor: pointer;
      font-size: 1rem;
      padding: 0.6rem 1.2rem;
      transition: background-color 0.2s, opacity 0.2s;
    }
    #startBtn { background-color: var(--success-color); }
    #stopBtn { background-color: var(--danger-color); }
    .buttons button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    .content-grid {
      display: grid;
      gap: 2rem;
      grid-template-columns: 1fr 1fr;
    }
    .log-container, .chart-container {
      background: #fafafa;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 1rem;
    }
    h2 {
      color: #555;
      font-size: 1.2rem;
      margin-top: 0;
    }
    #log {
      background-color: #2d3436;
      border-radius: 4px;
      color: #dfe6e9;
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.9rem;
      height: 300px;
      overflow-y: auto;
      padding: 0.8rem;
      white-space: pre-wrap;
      word-break: break-all;
    }
    .log-entry { margin-bottom: 0.5rem; }
    .log-entry.info { color: #55efc4; }
    .log-entry.event { color: #74b9ff; }
    .log-entry.error { color: #fab1a0; }
    /* Responsive layout for smaller screens */
    @media (max-width: 768px) {
      .content-grid { grid-template-columns: 1fr; }
      .controls {
        align-items: stretch;
        flex-direction: column;
      }
    }
  </style>
</head>
<body>

<div class="container">
  <!-- Page Header -->
  <h1>SSE (Server-Sent Events) 实时演示</h1>

  <!-- Connection Controls -->
  <div class="controls">
    <div class="status">
      <div id="statusIndicator" class="status-indicator disconnected"></div>
      <span id="statusText">已断开</span>
    </div>
    <div class="buttons">
      <button id="startBtn">▶️ 开始连接</button>
      <button id="stopBtn" disabled>⏹️ 断开连接</button>
    </div>
  </div>

  <!-- Main Content Area -->
  <div class="content-grid">
    <div class="log-container">
      <h2>实时事件日志</h2>
      <div id="log"></div>
    </div>
    <div class="chart-container">
      <h2>实时系统状态图表</h2>
      <canvas id="systemChart"></canvas>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    
    /**
     * Constants for magic strings and configuration.
     * @const
     */
    const CONSTANTS = {
      SSE_ENDPOINT: '/sse',
      MAX_CHART_POINTS: 15,
      EVENT_WELCOME: 'welcome',
      EVENT_SYSTEM_UPDATE: 'system_update',
      STATUS_CLASS: {
        CONNECTED: 'connected',
        CONNECTING: 'connecting',
        DISCONNECTED: 'disconnected',
      },
      LOG_TYPE: {
        INFO: 'info',
        EVENT: 'event',
        ERROR: 'error',
      },
    };

    // DOM Element references
    const startBtnEl = document.getElementById('startBtn');
    const stopBtnEl = document.getElementById('stopBtn');
    const statusIndicatorEl = document.getElementById('statusIndicator');
    const statusTextEl = document.getElementById('statusText');
    const logEl = document.getElementById('log');
    const chartCanvasEl = document.getElementById('systemChart');

    let eventSource = null;
    let chart = null;

    // --- UI Update Functions ---

    /**
     * Updates the connection status display.
     * @param {string} text - The text to display.
     * @param {string} statusClass - The CSS class for the indicator.
     */
    const updateStatus = (text, statusClass) => {
      statusTextEl.textContent = text;
      statusIndicatorEl.className = `status-indicator ${statusClass}`;
    };

    /**
     * Appends a message to the log container.
     * @param {string} message - The message to log.
     * @param {string} type - The type of log entry for styling.
     */
    const logMessage = (message, type = CONSTANTS.LOG_TYPE.INFO) => {
      const entryEl = document.createElement('div');
      entryEl.className = `log-entry ${type}`;
      const timestamp = new Date().toLocaleTimeString();
      entryEl.textContent = `[${timestamp}] ${message}`;
      logEl.appendChild(entryEl);
      // Auto-scroll to the bottom
      logEl.scrollTop = logEl.scrollHeight;
    };

    /**
     * Toggles the enabled/disabled state of control buttons.
     * @param {boolean} isConnected - True if the connection is active.
     */
    const toggleButtons = (isConnected) => {
      startBtnEl.disabled = isConnected;
      stopBtnEl.disabled = !isConnected;
    };


    // --- Chart.js Initialization and Update ---

    /**
     * Initializes the Chart.js line chart.
     */
    const initChart = () => {
      if (chart) {
        chart.destroy();
      }
      const ctx = chartCanvasEl.getContext('2d');
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'CPU 使用率 (%)',
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          }, {
            label: '内存使用率 (%)',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          }],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: { display: true, text: '使用率 (%)' },
            },
            x: {
              title: { display: true, text: '时间' },
            },
          },
          animation: {
            duration: 200, // Smooth animation
          },
        },
      });
    };

    /**
     * Updates the chart with new data from an event.
     * @param {object} data - The data object containing timestamp, cpu, and memory.
     */
    const updateChart = (data) => {
      if (!chart) return;

      chart.data.labels.push(data.timestamp);
      chart.data.datasets[0].data.push(data.cpu);
      chart.data.datasets[1].data.push(data.memory);

      // Remove old data to keep the chart clean
      if (chart.data.labels.length > CONSTANTS.MAX_CHART_POINTS) {
        chart.data.labels.shift();
        chart.data.datasets.forEach(dataset => dataset.data.shift());
      }

      chart.update();
    };

    // --- SSE Core Logic ---

    /**
     * Starts the Server-Sent Events connection and sets up listeners.
     */
    const startSSE = () => {
      if (eventSource) return;

      eventSource = new EventSource(CONSTANTS.SSE_ENDPOINT);
      updateStatus('连接中...', CONSTANTS.STATUS_CLASS.CONNECTING);
      logMessage('正在尝试连接到服务器...', CONSTANTS.LOG_TYPE.INFO);
      toggleButtons(true);

      // 1. On successful connection
      eventSource.onopen = () => {
        updateStatus('已连接', CONSTANTS.STATUS_CLASS.CONNECTED);
        logMessage('SSE 连接已成功建立！', CONSTANTS.LOG_TYPE.INFO);
      };

      // 2. On connection error
      eventSource.onerror = () => {
        // The browser automatically tries to reconnect, setting readyState to CONNECTING
        if (eventSource.readyState === EventSource.CONNECTING) {
          updateStatus('正在重连...', CONSTANTS.STATUS_CLASS.CONNECTING);
          logMessage('连接已断开，正在自动重连...', CONSTANTS.LOG_TYPE.ERROR);
        } else {
          logMessage('发生不可恢复的错误，连接关闭。', CONSTANTS.LOG_TYPE.ERROR);
          stopSSE();
        }
      };

      // 3. Listen for the custom 'welcome' event
      eventSource.addEventListener(CONSTANTS.EVENT_WELCOME, (event) => {
        logMessage(`服务器消息: ${event.data}`, CONSTANTS.LOG_TYPE.INFO);
      });

      // 4. Listen for the custom 'system_update' event
      eventSource.addEventListener(CONSTANTS.EVENT_SYSTEM_UPDATE, (event) => {
        try {
          const data = JSON.parse(event.data);
          const message = `接收到 [system_update]: CPU ${data.cpu}%, 内存 ${data.memory}%`;
          logMessage(message, CONSTANTS.LOG_TYPE.EVENT);
          updateChart(data);
        } catch (error) {
          logMessage('解析服务器数据失败。', CONSTANTS.LOG_TYPE.ERROR);
          console.error('Failed to parse JSON from event:', event.data, error);
        }
      });
    };

    /**
     * Closes the SSE connection and resets the state.
     */
    const stopSSE = () => {
      if (eventSource) {
        eventSource.close();
        eventSource = null;
        updateStatus('已断开', CONSTANTS.STATUS_CLASS.DISCONNECTED);
        logMessage('连接已由用户手动关闭。', CONSTANTS.LOG_TYPE.INFO);
        toggleButtons(false);
      }
    };

    // --- Event Listeners and Initialization ---
    startBtnEl.addEventListener('click', startSSE);
    stopBtnEl.addEventListener('click', stopSSE);

    // Initial page setup
    initChart();
    logMessage('页面加载完成。点击 "开始连接" 接收实时数据。', 'info');
  });
</script>

</body>
</html>
```